import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Apple, CheckCircle2, Scale } from 'lucide-react';
import { useCartStore } from '../store/cart';
import PricingToggle from '../components/PricingToggle';
import toast from 'react-hot-toast';

function NutritionPrograms() {
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const [displayIntervals, setDisplayIntervals] = React.useState<{
    nutritionOnly: 'month' | 'year',
    nutritionTraining: 'month' | 'year'
  }>({
    nutritionOnly: 'year',
    nutritionTraining: 'year'
  });

  const getPrice = (basePrice: number) => {
    // Always calculate yearly price for cart
    return basePrice * 12 * 0.8; // 20% discount for annual
  };

  // We'll use the PricingToggle component to display prices

  const handleAddToCart = (program: { name: string; price: number; description: string }) => {
    // Check if this is a one-time product
    const isOneTimeProduct = program.name.includes('One-Time') || program.name.includes('Shred');
    
    // Only set billing interval for subscription products
    let billingInterval: 'month' | 'year' | undefined = undefined;
    
    if (!isOneTimeProduct) {
      // Get the current interval for this program
      const programKey = program.name.includes("Nutrition Only") ? "nutritionOnly" : "nutritionTraining";
      // Type assertion to ensure TypeScript knows this is a valid key
      billingInterval = displayIntervals[programKey as keyof typeof displayIntervals];
    }
    
    addItem({
      id: program.name,
      name: program.name,
      price: program.price,
      description: program.description,
      billingInterval: billingInterval,
      yearlyDiscountApplied: billingInterval === 'year'
    });
    
    toast.success('Added to cart!');
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-12">
      {/* Hero Section */}
      <div className="relative h-[350px] mb-8 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-105 hover:scale-100 transition-transform duration-10000"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&w=2000&q=80")'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 animate-fadeIn">
            Transform Your Nutrition Journey
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl">
            Expert-guided nutrition programs designed to help you achieve sustainable results
          </p>
        </div>
      </div>

      <div data-component-name="NutritionPrograms" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nutrition Programs</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Choose the perfect nutrition plan to fuel your fitness journey and achieve your goals</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Nutrition Only */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-jme-cyan/30 transform hover:scale-[1.02] transition-transform hover:shadow-2xl duration-300">
            <div className="bg-gradient-to-br from-jme-cyan to-cyan-700 p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-300/20 rounded-full -ml-12 -mb-12 blur-lg"></div>
              <div className="flex items-center justify-center w-16 h-16 bg-cyan-400/30 rounded-2xl mb-6 backdrop-blur-sm shadow-lg relative z-10">
                <Apple className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 relative z-10">Nutrition Only</h3>
              <p className="text-lg opacity-90 mb-4 relative z-10">Custom nutrition plan, guidance & anytime support</p>
              <div className="text-sm text-teal-200 mb-4 relative z-10">3-month minimum commitment</div>
              <PricingToggle
                interval={displayIntervals.nutritionOnly}
                monthlyPrice={149}
                onChange={(newInterval) => setDisplayIntervals(prev => ({ ...prev, nutritionOnly: newInterval }))}
              />
            </div>
            <div className="p-8">
              <ul className="space-y-4 text-gray-600 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-teal-500 flex-shrink-0" />
                  <span>Personalized macro calculations</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-teal-500 flex-shrink-0" />
                  <span>Weekly check-ins and adjustments</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-teal-500 flex-shrink-0" />
                  <span>Custom meal planning guidance</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-teal-500 flex-shrink-0" />
                  <span>24/7 chat support with Jaime</span>
                </li>
              </ul>
              <button
                onClick={() => handleAddToCart({
                  name: "Nutrition Only Program",
                  price: getPrice(149),
                  description: `Nutrition Only Program (Annual) - Custom nutrition plan & support`
                })}
                className="block w-full py-3 px-4 rounded-xl bg-gradient-to-r from-jme-cyan to-cyan-600 text-white text-center font-semibold hover:from-cyan-600 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl duration-300"
              >
                Start Your Nutrition Journey
              </button>
            </div>
          </div>

          {/* Nutrition & Training */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-jme-purple/30 transform hover:scale-[1.02] transition-transform relative hover:shadow-2xl duration-300">
            <div className="absolute top-6 right-6 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm px-3 py-1 rounded-full shadow-md z-20">
              Most Popular
            </div>
            <div className="bg-gradient-to-br from-jme-purple to-purple-900 p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-300/20 rounded-full -ml-12 -mb-12 blur-lg"></div>
              <div className="flex items-center justify-center w-16 h-16 bg-purple-400/30 rounded-2xl mb-6 backdrop-blur-sm shadow-lg relative z-10">
                <Scale className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 relative z-10">Nutrition & Training</h3>
              <p className="text-lg opacity-90 mb-4 relative z-10">Complete transformation package with nutrition and custom workouts</p>
              <div className="text-sm text-purple-300 mb-4 relative z-10">3-month minimum commitment</div>
              <PricingToggle
                interval={displayIntervals.nutritionTraining}
                monthlyPrice={199}
                onChange={(newInterval) => setDisplayIntervals(prev => ({ ...prev, nutritionTraining: newInterval }))}
              />
            </div>
            <div className="p-8">
              <ul className="space-y-4 text-gray-600 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-purple-500 flex-shrink-0" />
                  <span>Everything in Nutrition Only</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-purple-500 flex-shrink-0" />
                  <span>Customized training program</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-purple-500 flex-shrink-0" />
                  <span>Form check videos & feedback</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-purple-500 flex-shrink-0" />
                  <span>Premium app features</span>
                </li>
              </ul>
              <button
                onClick={() => handleAddToCart({
                  name: "Nutrition & Training Program",
                  price: getPrice(199),
                  description: `Nutrition & Training Program (Annual) - Complete transformation package`
                })}
                className="block w-full py-3 px-4 rounded-xl bg-gradient-to-r from-jme-purple to-purple-700 text-white text-center font-semibold hover:from-purple-600 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl duration-300"
              >
                Start Complete Program
              </button>
            </div>
          </div>
        </div>

        {/* One-Time Macros */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">One-Time Offerings</h2>
            <p className="text-gray-600">Get started with a single purchase option</p>
          </div>
          <div data-component-name="NutritionPrograms" className="bg-gradient-to-br from-jme-cyan to-cyan-700 rounded-2xl p-8 text-white shadow-xl transform hover:scale-[1.01] transition-transform duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-300/20 rounded-full -ml-24 -mb-24 blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm shadow-lg">
                  <Scale className="w-8 h-8 text-white" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold mb-2">One-Time Macros Calculation</h3>
                  <p className="text-lg opacity-90 mb-4">Complete macro calculation with comprehensive guides</p>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="bg-white/20 rounded-full px-3 py-1 text-sm backdrop-blur-sm">Personalized macros</span>
                    <span className="bg-white/20 rounded-full px-3 py-1 text-sm backdrop-blur-sm">Detailed guides</span>
                    <span className="bg-white/20 rounded-full px-3 py-1 text-sm backdrop-blur-sm">Meal templates</span>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <div className="text-3xl font-bold mb-1">$99</div>
                  <div className="text-sm opacity-80 mb-4">one-time payment</div>
                  <button
                    onClick={() => handleAddToCart({
                      name: "One-Time Macros Calculation",
                      price: 99,
                      description: "One-Time Macros Calculation - Complete macro calculation with comprehensive guides"
                    })}
                    className="bg-white text-cyan-700 px-6 py-3 rounded-xl font-semibold hover:bg-cyan-50 transition-colors shadow-lg hover:shadow-xl duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonials Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-jme-cyan/10 to-jme-purple/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-center mb-8">What Our Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-jme-cyan to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-lg">RJ</div>
                  <div className="ml-4">
                    <p className="font-semibold">Rebecca J.</p>
                    <p className="text-sm text-gray-500">Nutrition Client</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"The personalized nutrition plan changed my relationship with food. I've lost 15 pounds and feel more energetic than ever!"</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-jme-purple to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-lg">DK</div>
                  <div className="ml-4">
                    <p className="font-semibold">David K.</p>
                    <p className="text-sm text-gray-500">Complete Program Client</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"The combination of nutrition guidance and custom workouts has been transformative. Jaime's support is incredible."</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">SL</div>
                  <div className="ml-4">
                    <p className="font-semibold">Sarah L.</p>
                    <p className="text-sm text-gray-500">Macros Client</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"Even the one-time macros calculation gave me so much clarity. The meal planning templates are easy to follow and customize."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NutritionPrograms;