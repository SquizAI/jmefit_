import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Dumbbell, CheckCircle2, MessageSquare, Flame, Scale, LineChart, Smartphone, Apple } from 'lucide-react';
import TransformationsBanner from '../components/TransformationsBanner';
import FAQAccordion from '../components/FAQAccordion';
import SEO from '../components/SEO';

import PricingToggle from '../components/PricingToggle';
import { useCartStore } from '../store/cart';
import toast from 'react-hot-toast';

function Programs() {

  const [selectedShredDate, setSelectedShredDate] = useState<string>('');
  const shredDateRef = useRef<HTMLSelectElement>(null);
  const [displayIntervals, setDisplayIntervals] = useState<{
    selfLed: 'month' | 'year',
    trainerFeedback: 'month' | 'year',
    nutritionOnly: 'month' | 'year',
    nutritionTraining: 'month' | 'year'
  }>({
    selfLed: 'year',
    trainerFeedback: 'year',
    nutritionOnly: 'year',
    nutritionTraining: 'year'
  });
  const { addItem } = useCartStore();
  const navigate = useNavigate();
  
  // Product pricing information
  const products = {
    nutritionOnly: {
      id: 'nutrition-only',
      name: 'Nutrition Only',
      monthlyPrice: 149,
      yearlyPrice: 1430, // ~20% discount
      description: 'Custom nutrition plan, guidance & anytime support'
    },
    nutritionTraining: {
      id: 'nutrition-training',
      name: 'Nutrition & Training',
      monthlyPrice: 199,
      yearlyPrice: 1910, // ~20% discount
      description: 'Complete transformation package with nutrition and custom workouts'
    },
    selfLedTraining: {
      id: 'self-led-training',
      name: 'Self-Led Training',
      monthlyPrice: 19.99,
      yearlyPrice: 191.90, // ~20% discount
      description: 'Complete app access with monthly workout plans'
    },
    trainerFeedback: {
      id: 'trainer-feedback',
      name: 'Trainer Feedback',
      monthlyPrice: 34.99,
      yearlyPrice: 335.90, // ~20% discount
      description: 'Personal guidance & form checks'
    },
    macrosCalculation: {
      id: 'macros-calculation',
      name: 'One-Time Macros Calculation',
      price: 99, // Updated to match the price on other pages
      description: 'Complete macro calculation with comprehensive guides'
    },
    shredChallenge: {
      id: 'shred-challenge',
      name: 'SHRED Challenge',
      price: 249,
      description: 'This 6-week, kick-start challenge'
    }
  };
  
  const getAppPrice = (basePrice: number) => {
    // Always calculate yearly price for cart
    return basePrice * 12 * 0.8; // 20% discount for annual
  };

  const handleAddToCart = (productId: string, price: number, name: string, isSubscription: boolean = true) => {
    // Always use yearly billing interval for subscription products
    // The user can toggle to monthly in the cart if desired
    const defaultBillingInterval: 'month' | 'year' = 'year';
    
    // For yearly subscription products, use the yearly price
    const finalPrice = isSubscription && defaultBillingInterval === 'year' ? 
      (productId === 'nutrition-only' ? products.nutritionOnly.yearlyPrice : 
       productId === 'nutrition-training' ? products.nutritionTraining.yearlyPrice :
       productId === 'self-led-training' ? products.selfLedTraining.yearlyPrice :
       productId === 'trainer-feedback' ? products.trainerFeedback.yearlyPrice : price) : price;
    
    addItem({
      id: productId,
      name: name,
      price: finalPrice,
      billingInterval: isSubscription ? defaultBillingInterval : undefined,
      description: ''
    });
    
    // Go directly to checkout instead of cart
    navigate('/checkout');
  };
  
  const handleAppAddToCart = (program: { name: string; price: number; description: string }) => {
    // Get the current interval for this program
    let programKey: keyof typeof displayIntervals;
    
    if (program.name === "Self-Led Training") {
      programKey = "selfLed";
    } else if (program.name === "Trainer Feedback") {
      programKey = "trainerFeedback";
    } else if (program.name === "Nutrition Only Program") {
      programKey = "nutritionOnly";
    } else {
      programKey = "nutritionTraining";
    }
    
    // Get the interval for this program
    const interval = displayIntervals[programKey];
    
    addItem({
      id: program.name,
      name: program.name,
      price: program.price,
      description: program.description,
      billingInterval: interval
    });
    toast.success('Added to cart!');
    
    // Go directly to checkout instead of cart
    navigate('/checkout');
  };
  const faqItems = [
    {
      question: "How do I get started?",
      answer: "Choose a program that matches your fitness level and goals. Once you subscribe, you'll get immediate access to your workouts and meal plans through our MyPTHub app."
    },
    {
      question: "Can I switch programs?",
      answer: "Yes! You can upgrade or change your program at any time. Your progress will be saved and transferred to your new program. Contact us if you need help deciding which program is right for you."
    },
    {
      question: "What equipment do I need?",
      answer: "It depends on your program. The Basic Plan requires dumbbells, resistance bands, and optional equipment like TRX or stability balls. Premium and Elite programs offer both gym and home workout options with equipment substitutions available."
    },
    {
      question: "Is there a refund policy?",
      answer: "Because of the nature of the programs, we do not offer a refund. You will have access to the program purchased until canceled at your request. We are confident you will love our services!"
    },
    {
      question: "How often are the workouts updated?",
      answer: "Workouts change monthly with continued subscription. For the SHRED challenge, workouts are updated after 3 weeks to keep your routine fresh and challenging."
    },
    {
      question: "Can I access previous workout plans?",
      answer: "Premium and Elite members have access to both current and previous training blocks, giving you more flexibility in your workout schedule."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[400px] mb-24">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=80")'
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            <i>Transform</i> Your Body & Mind with JMEFit
          </h1>
          <p className="text-2xl text-white font-medium max-w-3xl bg-gradient-to-r from-jme-cyan via-white to-jme-purple bg-clip-text text-transparent animate-gradient">
            Comprehensive nutrition and training programs designed to help you reach your fitness goals
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
      <SEO 
        title="Training Programs"
        description="Transform your body with our comprehensive nutrition and training programs."
      />
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Nutrition Programs</h2>
          <p className="text-xl text-gray-300 text-center mb-4">
            Subscription-based programs with a 3-month minimum commitment
          </p>
          <p className="text-lg text-gray-400 text-center mb-8">
            Continue your journey month-to-month after the initial commitment
          </p>
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
                onClick={() => handleAppAddToCart({
                  name: "Nutrition Only Program",
                  price: getAppPrice(149),
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
                onClick={() => handleAppAddToCart({
                  name: "Nutrition & Training Program",
                  price: getAppPrice(199),
                  description: `Nutrition & Training Program (Annual) - Complete transformation package`
                })}
                className="block w-full py-3 px-4 rounded-xl bg-gradient-to-r from-jme-purple to-purple-700 text-white text-center font-semibold hover:from-purple-600 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl duration-300"
              >
                Start Complete Program
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* One-Time Macros Program */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white">One-Time Offerings</h2>
          <p className="text-gray-400">Get started with a single purchase option</p>
        </div>
        <div 
          className="bg-gradient-to-br from-jme-cyan to-cyan-700 rounded-2xl p-8 text-white shadow-xl transform hover:scale-[1.01] transition-transform duration-300 relative overflow-hidden"
        >
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
                <div className="text-3xl font-bold mb-1">$99.00</div>
                <div className="text-sm opacity-80 mb-4">one-time payment</div>
                <button
                  onClick={() => handleAddToCart(
                    products.macrosCalculation.id, 
                    products.macrosCalculation.price, 
                    products.macrosCalculation.name,
                    false
                  )}
                  className="bg-white text-cyan-700 px-6 py-3 rounded-xl font-semibold hover:bg-cyan-50 transition-colors shadow-lg hover:shadow-xl duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16"></div>
      
      {/* Monthly App Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Monthly App Training</h2>
          <p className="text-xl text-gray-300 text-center mb-4">
            Choose from flexible 3, 4, or 5-day splits customized to your schedule and goals
          </p>
          <p className="text-lg text-gray-400 text-center mb-8">
            Monthly updated workouts ensure continuous progress and adaptation to your fitness level
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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
                onClick={() => handleAppAddToCart({ 
                  name: "Self-Led Training",
                  price: getAppPrice(19.99),
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
                onClick={() => handleAppAddToCart({
                  name: "Trainer Feedback Program",
                  price: getAppPrice(34.99),
                  description: "Annual Trainer Feedback Program - Premium training with personal guidance"
                })}
                className="block w-full py-3 px-4 rounded-xl bg-gradient-to-r from-jme-purple to-purple-700 text-white text-center font-semibold hover:from-purple-600 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl duration-300"
              >
                Start With Trainer Feedback
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SHRED Challenge Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Special Challenge Program</h2>
          <p className="text-lg text-gray-400">Transform your body with our intensive 6-week program</p>
        </div>
        <div id="shred-challenge" className="bg-gradient-to-r from-jme-cyan via-jme-purple to-jme-cyan bg-[length:200%_100%] hover:bg-[100%] transition-all duration-500 rounded-2xl text-white p-8 shadow-[0_0_30px_rgba(139,92,246,0.3)] border-4 border-white/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-jme-cyan/20 via-jme-purple/20 to-jme-cyan/20 rounded-2xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-300/20 rounded-full -ml-24 -mb-24 blur-2xl"></div>
          <div className="relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg transform hover:rotate-12 transition-all cursor-pointer group backdrop-blur-sm">
                  <Flame className="w-10 h-10 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform" />
                </div>
                <h2 className="text-4xl font-bold">SHRED with JmeFit!</h2>
              </div>
              <div className="text-4xl font-bold mb-6">$249<span className="text-xl font-normal ml-2">one-time payment</span></div>
              
              <div className="mb-6 max-w-md mx-auto">
                <label htmlFor="shredDate" className="block text-white text-lg font-medium mb-2">Select Start Date:</label>
                <select
                  id="shredDate"
                  ref={shredDateRef}
                  value={selectedShredDate}
                  onChange={(e) => setSelectedShredDate(e.target.value)}
                  className="w-full bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                  required
                >
                  <option value="" disabled>Choose a start date</option>
                  <option value="2025-04-13">April 13, 2025</option>
                  <option value="2025-05-18">May 18, 2025</option>
                  <option value="2025-07-06">July 6, 2025</option>
                  <option value="2025-08-10">August 10, 2025</option>
                  <option value="2025-09-14">September 14, 2025</option>
                  <option value="2025-10-19">October 19, 2025</option>
                </select>
              </div>
              
              <button
                onClick={() => {
                  if (!selectedShredDate) {
                    alert('Please select a start date');
                    shredDateRef.current?.focus();
                    return;
                  }
                  handleAddToCart(
                    products.shredChallenge.id, 
                    products.shredChallenge.price, 
                    `${products.shredChallenge.name} - Starting ${new Date(selectedShredDate).toLocaleDateString()}`,
                    false
                  );
                }}
                className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl duration-300 inline-block mb-6"
              >
                Add to Cart
              </button>
              <p className="text-xl mb-6 leading-relaxed">
                This 6-week, kick-start challenge is designed not only to build muscle, lose fat & gain strength simultaneously, 
                but to also teach you how to eat for life, all while living life!
              </p>
              <p className="text-xl mb-10 leading-relaxed">
                Whether you're in the beginning of your journey with zero experience, a seasoned lifter, or somewhere in the middle- 
                this challenge will guide you & create results.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 hover:bg-black/30 transition-all duration-300 border-2 border-white/20 hover:border-white/40 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-4 mx-auto">
                    <Scale className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold mb-3 text-center text-lg">Custom Macros</h3>
                  <ul className="text-sm space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Personalized fat loss macros</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Maintenance calories for body recomp</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Sample meal plan with snacks</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 hover:bg-black/30 transition-all duration-300 border-2 border-white/20 hover:border-white/40 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-4 mx-auto">
                    <LineChart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold mb-3 text-center text-lg">Check-Ins</h3>
                  <ul className="text-sm space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Interactive check-in with Jaime</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Progress tracking & adjustments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Comprehensive tracking guides</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Educational content & tips</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 hover:bg-black/30 transition-all duration-300 border-2 border-white/20 hover:border-white/40 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-4 mx-auto">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold mb-3 text-center text-lg">MyPTHub App</h3>
                  <ul className="text-sm space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Free access included</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Track workouts & nutrition</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Direct Q&A with Jaime</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 hover:bg-black/30 transition-all duration-300 border-2 border-white/20 hover:border-white/40 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-4 mx-auto">
                    <Dumbbell className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold mb-3 text-center text-lg">Exclusive Workouts</h3>
                  <ul className="text-sm space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>5 workouts per week with progressive overload</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Home and gym options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Updates after 4 weeks</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <Link
                to="/shred-waitlist"
                className="inline-block bg-gradient-to-r from-white to-gray-100 text-jme-purple font-bold py-4 px-10 rounded-xl hover:from-gray-100 hover:to-white transform hover:scale-105 transition-all duration-300 mt-8 shadow-lg hover:shadow-xl border-2 border-white/50"
              >
                Join the SHRED Waitlist
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Transformations Banner */}
      <TransformationsBanner />

      {/* Free Consultation */}
      <div className="max-w-4xl mx-auto mt-24 px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-jme-cyan/10 to-jme-purple/10 rounded-3xl p-10 text-center relative overflow-hidden border border-white/10 shadow-xl">
          <div className="absolute inset-0 bg-[url('/src/assets/pattern-dot.png')] opacity-5"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-jme-cyan/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-jme-purple/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">Not Sure Which Plan Is Right For You?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Schedule a free consultation with our fitness experts to find the perfect program for your goals and lifestyle.</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-jme-cyan to-jme-purple text-white font-semibold py-4 px-10 rounded-xl hover:from-jme-cyan hover:to-jme-purple hover:shadow-lg hover:shadow-jme-purple/20 transition-all transform hover:scale-105 duration-300"
            >
              <MessageSquare className="w-5 h-5" />
              Schedule a Free Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Merch Section */}
      <div className="max-w-5xl mx-auto mt-24 px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-dark-card to-dark-card/80 rounded-3xl p-12 text-center relative overflow-hidden border border-dark-accent/30 shadow-2xl">
          <div className="absolute inset-0 bg-[url('/src/assets/pattern-dot.png')] opacity-5"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-jme-purple/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-jme-cyan/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="inline-block bg-gradient-to-r from-jme-cyan to-jme-purple p-2 rounded-xl mb-6">
              <div className="bg-dark-card/90 rounded-lg px-6 py-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-jme-cyan to-jme-purple font-bold">COMING SOON</span>
              </div>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-4">JmeFit Merch</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Exclusive apparel and accessories to represent your fitness journey</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-dark-accent/30 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-dark-accent/50 hover:border-jme-cyan/30 transition-all duration-300 hover:shadow-jme-cyan/10 hover:shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-jme-cyan/20 to-jme-cyan/5 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👕</span>
                </div>
                <h3 className="font-bold text-white mb-2">Premium Apparel</h3>
                <p className="text-gray-400 text-sm">High-quality workout shirts, hoodies, and more</p>
              </div>
              
              <div className="bg-dark-accent/30 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-dark-accent/50 hover:border-jme-purple/30 transition-all duration-300 hover:shadow-jme-purple/10 hover:shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-jme-purple/20 to-jme-purple/5 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🧢</span>
                </div>
                <h3 className="font-bold text-white mb-2">Accessories</h3>
                <p className="text-gray-400 text-sm">Hats, bags, water bottles, and gym essentials</p>
              </div>
              
              <div className="bg-dark-accent/30 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-dark-accent/50 hover:border-jme-cyan/30 transition-all duration-300 hover:shadow-jme-cyan/10 hover:shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-jme-cyan/20 to-jme-purple/20 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎁</span>
                </div>
                <h3 className="font-bold text-white mb-2">Limited Editions</h3>
                <p className="text-gray-400 text-sm">Exclusive drops and special collections</p>
              </div>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="bg-dark-accent/40 rounded-xl p-6 shadow-lg border border-dark-accent/60">
                <p className="text-gray-300 mb-4">
                  Get ready for exclusive JmeFit apparel and accessories. 
                  Sign up for our newsletter to be the first to know when our merch drops!
                </p>
                <button className="bg-gradient-to-r from-jme-cyan to-jme-purple text-white font-semibold py-3 px-8 rounded-lg hover:shadow-lg hover:shadow-jme-purple/20 transition-all transform hover:scale-105 duration-300">
                  Join the Waitlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-white inline-block mb-6">Frequently Asked Questions</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Find answers to common questions about our fitness programs and services</p>
        </div>
        <div className="relative">
          <FAQAccordion items={faqItems} />
        </div>
      </div>
    </div>
  );
}

export default Programs;