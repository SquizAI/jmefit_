import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { linkIdentity, unlinkIdentity, getUserIdentities } from '../lib/auth';
import { format } from 'date-fns';
import { Activity, Calendar, CreditCard, Dumbbell, Settings, ShoppingBag, TrendingUp, User, ToggleLeft as Google } from 'lucide-react';
import SEO from '../components/SEO';
import toast from 'react-hot-toast';

function Dashboard() {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'workouts' | 'orders' | 'settings'>('overview');
  const [loading, setLoading] = useState(false);
  const [identities, setIdentities] = useState<any[]>([]);
  const [linkingLoading, setLinkingLoading] = useState(false);

  useEffect(() => {
    if (user) {
      getUserIdentities().then(setIdentities).catch(console.error);
    }
  }, [user]);

  const handleLinkGoogle = async () => {
    setLinkingLoading(true);
    try {
      await linkIdentity('google');
      toast.success('Google account linked successfully');
      // Refresh identities
      const newIdentities = await getUserIdentities();
      setIdentities(newIdentities);
    } catch (error) {
      console.error('Failed to link Google account:', error);
    } finally {
      setLinkingLoading(false);
    }
  };

  const handleUnlinkIdentity = async (identity: any) => {
    try {
      await unlinkIdentity(identity);
      // Refresh identities
      const newIdentities = await getUserIdentities();
      setIdentities(newIdentities);
    } catch (error) {
      console.error('Failed to unlink account:', error);
    }
  };

  // Fetch user's orders
  const { data: orders } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  // Fetch user's workout logs
  const { data: workoutLogs } = useQuery({
    queryKey: ['workout_logs', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('workout_logs')
        .select('*')
        .eq('user_id', user?.id)
        .order('workout_date', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    }
  });

  // Fetch user's active subscription
  const { data: subscription } = useQuery({
    queryKey: ['subscription', user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user?.id)
        .eq('status', 'active');

      return data?.[0] || null;
    }
  });

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const updates = {
      full_name: formData.get('fullName') as string,
    };

    try {
      await updateProfile(updates);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Dashboard" />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.user_metadata?.full_name || 'Athlete'}!
            </h1>
            <p className="text-gray-600">Track your progress and manage your account</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'overview'
                  ? 'bg-jme-purple text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Activity className="w-5 h-5 inline-block mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('workouts')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'workouts'
                  ? 'bg-jme-purple text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Dumbbell className="w-5 h-5 inline-block mr-2" />
              Workouts
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'orders'
                  ? 'bg-jme-purple text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ShoppingBag className="w-5 h-5 inline-block mr-2" />
              Orders
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'settings'
                  ? 'bg-jme-purple text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Settings className="w-5 h-5 inline-block mr-2" />
              Settings
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <>
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Active Subscription</h3>
                      <CreditCard className="w-6 h-6 text-jme-purple" />
                    </div>
                    {subscription ? (
                      <>
                        <p className="text-2xl font-bold text-gray-900 mb-2">
                          {subscription.plan_id || 'No Plan'}
                        </p>
                        <p className="text-sm text-gray-500">
                          Next billing date:{' '}
                          {subscription.current_period_end 
                            ? format(new Date(subscription.current_period_end), 'MMM d, yyyy')
                            : 'N/A'}
                        </p>
                      </>
                    ) : (
                      <p className="text-gray-500">No active subscription</p>
                    )}
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Recent Workouts</h3>
                      <Calendar className="w-6 h-6 text-green-500" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-2">
                      {workoutLogs?.length || 0}
                    </p>
                    <p className="text-sm text-gray-500">Workouts this month</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Progress</h3>
                      <TrendingUp className="w-6 h-6 text-blue-500" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-2">
                      Coming Soon
                    </p>
                    <p className="text-sm text-gray-500">Track your fitness journey</p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-6 border-b">
                    <h3 className="text-lg font-semibold">Recent Activity</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      {workoutLogs?.map(log => (
                        <div key={log.id} className="flex items-start">
                          <div className="flex-shrink-0">
                            <Dumbbell className="w-5 h-5 text-gray-400" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">
                              Completed workout: {log.program_id}
                            </p>
                            <p className="text-sm text-gray-500">
                              {format(new Date(log.workout_date), 'MMM d, yyyy')}
                            </p>
                            {log.notes && (
                              <p className="mt-2 text-sm text-gray-600">{log.notes}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'workouts' && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold">Workout History</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Program
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Notes
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {workoutLogs?.map(log => (
                        <tr key={log.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {format(new Date(log.workout_date), 'MMM d, yyyy')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {log.program_id}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {log.notes || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold">Order History</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {orders?.map(order => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.id.slice(0, 8)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {format(new Date(order.created_at), 'MMM d, yyyy')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              order.status === 'paid'
                                ? 'bg-green-100 text-green-800'
                                : order.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${order.total}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold">Account Settings</h3>
                </div>
                <div className="p-6">
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        defaultValue={user?.user_metadata?.full_name || ''}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-jme-purple focus:border-jme-purple"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        value={user?.email}
                        disabled
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-jme-purple hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jme-purple ${
                          loading ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                      >
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
          
          {/* Linked Accounts Section */}
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Linked Accounts</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Google className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">Google</span>
                </div>
                {identities?.find(i => i.provider === 'google') ? (
                  <button
                    onClick={() => handleUnlinkIdentity(identities.find(i => i.provider === 'google'))}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Unlink
                  </button>
                ) : (
                  <button
                    onClick={handleLinkGoogle}
                    disabled={linkingLoading}
                    className="text-sm text-jme-purple hover:text-purple-700"
                  >
                    {linkingLoading ? 'Linking...' : 'Link Account'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;