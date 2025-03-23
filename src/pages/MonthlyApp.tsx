import React from 'react';
import { Dumbbell, CheckCircle2, MessageSquare } from 'lucide-react';
import { useCartStore } from '../store/cart';
import PricingToggle from '../components/PricingToggle';
import toast from 'react-hot-toast';

const MonthlyApp = () => {
  const { addItem } = useCartStore();
  const [displayIntervals, setDisplayIntervals] = React.useState<{
    selfLed: 'month' | 'year',
    trainerFeedback: 'month' | 'year'
  }>({
    selfLed: 'year',
    trainerFeedback: 'year'
  });

  const getPrice = (basePrice: number) => {
    // Always calculate yearly price for cart
    return basePrice * 12 * 0.8; // 20% discount for annual
  };

  // Calculate yearly price with discount

  const handleAddToCart = (program: { name: string; price: number; description: string }) => {
    // Get the current interval for this program
    const programKey = program.name === "Self-Led Training" ? "selfLed" : "trainerFeedback";
    // Type assertion to ensure TypeScript knows this is a valid key
    const interval = displayIntervals[programKey as keyof typeof displayIntervals];
    
    addItem({
      id: program.name,
      name: program.name,
      price: program.price,
      description: program.description,
      billingInterval: interval
    });
    toast.success('Added to cart!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-12">
      {/* Hero Section */}
      <div className="relative h-[250px] mb-8 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=2000&q=80")'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Elevate Your Fitness Journey
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Choose the plan that fits your lifestyle and goals
          </p>
        </div>
      </div>
      
      <div data-component-name="MonthlyApp" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Membership Options</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Select the perfect plan to achieve your fitness goals with expert guidance and support</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Self-Led Plan */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-jme-cyan/30 transform hover:scale-[1.02] transition-transform hover:shadow-2xl duration-300">
            <div className="bg-gradient-to-br from-jme-cyan to-cyan-700 p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-300/20 rounded-full -ml-12 -mb-12 blur-lg"></div>
              <div className="flex items-center justify-center w-16 h-16 bg-cyan-400/30 rounded-2xl mb-6 backdrop-blur-sm shadow-lg relative z-10">
                <Dumbbell className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 relative z-10">Self-Led Training</h3>
              <p className="text-lg opacity-90 relative z-10">Complete app access with monthly workout plans</p>
              <PricingToggle
                interval={displayIntervals.selfLed}
                monthlyPrice={19.99}
                onChange={(newInterval) => setDisplayIntervals(prev => ({ ...prev, selfLed: newInterval }))}
              />
            </div>
            <div className="p-8 bg-gradient-to-b from-white to-gray-50">
              <ul className="space-y-4 text-gray-600 mb-8">
                {[
                  'Full access to JmeFit app',
                  'New monthly workout plans (3-5 days)',
                  'Structured progressions',
                  'Exercise video library',
                  'Detailed workout logging',
                  'Cancel anytime'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-jme-cyan flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleAddToCart({ 
                  name: "Self-Led Training",
                  price: getPrice(19.99),
                  description: "Annual Self-Led Training - Monthly workout plans & app access"
                })}
                className="block w-full py-3 px-4 rounded-xl bg-gradient-to-r from-jme-cyan to-cyan-600 text-white text-center font-semibold hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl duration-300"
              >
                Start Self-Led Training
              </button>
            </div>
          </div>

          {/* Trainer Feedback Plan */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-jme-purple/30 transform hover:scale-[1.02] transition-transform relative hover:shadow-2xl duration-300">
            <div className="absolute top-6 right-6 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm px-3 py-1 rounded-full shadow-md z-20">
              Most Popular
            </div>
            <div className="bg-gradient-to-br from-jme-purple to-purple-900 p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-300/20 rounded-full -ml-12 -mb-12 blur-lg"></div>
              <div className="flex items-center justify-center w-16 h-16 bg-purple-400/30 rounded-2xl mb-6 backdrop-blur-sm shadow-lg relative z-10">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 relative z-10">Trainer Feedback</h3>
              <p className="text-lg opacity-90 relative z-10">Personal guidance & form checks</p>
              <PricingToggle
                interval={displayIntervals.trainerFeedback}
                monthlyPrice={34.99}
                onChange={(newInterval) => setDisplayIntervals(prev => ({ ...prev, trainerFeedback: newInterval }))}
              />
            </div>
            <div className="p-8 bg-gradient-to-b from-white to-gray-50">
              <ul className="space-y-4 text-gray-600 mb-8">
                {[
                  'Everything in Self-Led plan',
                  'Form check video reviews',
                  'Direct messaging with Jaime',
                  'Workout adaptations & swaps',
                  'Access to previous workouts',
                  'Premium support access',
                  'Cancel anytime'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-jme-purple flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleAddToCart({
                  name: "Trainer Feedback Program",
                  price: getPrice(34.99),
                  description: "Annual Trainer Feedback Program - Premium training with personal guidance"
                })}
                className="block w-full py-3 px-4 rounded-xl bg-gradient-to-r from-jme-purple to-purple-700 text-white text-center font-semibold hover:from-purple-600 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl duration-300"
              >
                Start With Trainer Feedback
              </button>
            </div>
          </div>
        </div>
        
        {/* Testimonials Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-jme-cyan/10 to-jme-purple/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-center mb-8">What Our Members Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-jme-cyan to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-lg">JS</div>
                  <div className="ml-4">
                    <p className="font-semibold">Jessica S.</p>
                    <p className="text-sm text-gray-500">Self-Led Member</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"The monthly workout plans are incredible! I've seen more progress in 3 months than I did in a year at my old gym."</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-jme-purple to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-lg">MT</div>
                  <div className="ml-4">
                    <p className="font-semibold">Michael T.</p>
                    <p className="text-sm text-gray-500">Trainer Feedback Member</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"The form check videos have completely transformed my technique. Jaime's feedback is always detailed and helpful."</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">AL</div>
                  <div className="ml-4">
                    <p className="font-semibold">Amanda L.</p>
                    <p className="text-sm text-gray-500">Trainer Feedback Member</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"Having direct access to Jaime for questions and workout adaptations has been a game-changer for my fitness journey."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyApp;