import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Navigate, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, User, ArrowRight, Loader, AlertCircle, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
// SEO component is imported but not used
import SEO from '../components/SEO';

type AuthMode = 'signin' | 'signup';

interface FormErrors {
  email?: string;
  password?: string;
  fullName?: string;
}

function Auth() {
  const { user, emailVerified } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState<AuthMode>(location.search.includes('mode=signup') ? 'signup' : 'signin');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [formTouched, setFormTouched] = useState({
    email: false,
    password: false,
    fullName: false
  });

  const from = location.state?.from?.pathname || '/dashboard';

  if (user && (emailVerified || mode === 'signin')) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName
            }
          }
        });
        
        if (error) throw error;
        
        // Show verification message for new signups
        if (mode === 'signup') {
          toast.success(
            <div>
              <p className="font-medium">Please check your email to verify your account.</p>
              <p className="text-sm mt-1">Check your spam folder if you don't see it.</p>
            </div>
          );
        }
        
        toast.success('Welcome to JMEFit! Please check your email to verify your account.');
        navigate(from);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });

        if (error) throw error;
        navigate(from);
      }
    } catch (error) {
      console.error('Auth error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Show verification reminder if user exists but email isn't verified
  // Add validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  // Handle form field changes with validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Mark field as touched
    setFormTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate fields
    const newErrors = { ...errors };
    
    if (name === 'email') {
      if (!value) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(value)) {
        newErrors.email = 'Please enter a valid email';
      } else {
        delete newErrors.email;
      }
    }
    
    if (name === 'password') {
      if (!value) {
        newErrors.password = 'Password is required';
      } else if (!validatePassword(value)) {
        newErrors.password = 'Password must be at least 8 characters';
      } else {
        delete newErrors.password;
      }
    }
    
    if (name === 'fullName' && mode === 'signup') {
      if (!value) {
        newErrors.fullName = 'Full name is required';
      } else {
        delete newErrors.fullName;
      }
    }
    
    setErrors(newErrors);
  };
  
  // Check if form is valid
  const isFormValid = () => {
    if (mode === 'signin') {
      return validateEmail(formData.email) && formData.password.length > 0;
    } else {
      return validateEmail(formData.email) && 
             validatePassword(formData.password) && 
             formData.fullName.length > 0;
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (user && !emailVerified && mode === 'signup') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center mb-8">
            <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
            <p className="text-gray-600">
              Please check your email to verify your account. You'll need to verify your email before accessing your account.
            </p>
          </div>
          <button
            onClick={async () => {
              try {
                const { error } = await supabase.auth.resend({
                  type: 'signup',
                  email: user.email!,
                });
                if (error) throw error;
                toast.success('Verification email resent!');
              } catch (error) {
                toast.error('Failed to resend verification email');
              }
            }}
            className="w-full bg-jme-purple text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Resend Verification Email
          </button>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate('/');
            }}
            className="w-full mt-4 text-gray-600 hover:text-gray-900 transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <img
            src="/JME_fit_black_purple.png"
            alt="JMEFit"
            className="mx-auto h-16 w-auto"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {mode === 'signin' ? 'Welcome Back!' : 'Join JMEFit Today'}
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            {mode === 'signin' ? (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => setMode('signup')}
                  className="font-medium text-jme-purple hover:text-purple-700 underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setMode('signin')}
                  className="font-medium text-jme-purple hover:text-purple-700 underline"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div>
              <label htmlFor="fullName" className="sr-only">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-jme-purple focus:border-jme-purple focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-jme-purple focus:border-jme-purple focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              {mode === 'signin' && (
                <button
                  type="button"
                  onClick={() => {
                    if (formData.email) {
                      supabase.auth.resetPasswordForEmail(formData.email);
                      toast.success('Password reset instructions sent to your email');
                    } else {
                      toast.error('Please enter your email first');
                    }
                  }}
                  className="text-sm font-medium text-jme-purple hover:text-purple-700"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none relative block w-full px-10 py-3 border ${errors.password && formTouched.password ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-jme-purple focus:border-jme-purple focus:z-10 sm:text-sm pr-10`}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && formTouched.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || !isFormValid()}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white ${
                mode === 'signup' 
                  ? 'bg-gradient-to-r from-jme-purple to-purple-700 hover:from-purple-700 hover:to-purple-800'
                  : 'bg-jme-purple hover:bg-purple-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jme-purple transition-all transform hover:scale-[1.02]`}
            >
              {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {mode === 'signin' ? 'Sign in' : 'Create Account'}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            {mode === 'signup' && (
              <p className="mt-4 text-sm text-gray-500 text-center">
                By creating an account, you agree to our{' '}
                <Link to="/terms" className="text-jme-purple hover:text-purple-700">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-jme-purple hover:text-purple-700">
                  Privacy Policy
                </Link>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Auth;