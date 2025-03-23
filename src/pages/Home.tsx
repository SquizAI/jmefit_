
import { Link } from 'react-router-dom';
import { MessageSquare, Users, AppWindow, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

function Home() {
  return (
    <div className="relative">
      <SEO title="Transform Your Body and Mind" />
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center h-screen w-full"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=2000&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative h-full flex items-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="mb-8 space-y-2 sm:space-y-4">
              <div className="flex flex-col items-center sm:flex-row sm:items-baseline sm:gap-4">
                <span className="text-5xl sm:text-7xl md:text-8xl font-black bg-gradient-to-r from-[#FF1493] via-pink-500 to-[#FF1493] bg-clip-text text-transparent leading-none">TRANSFORM</span>
                <span className="text-2xl sm:text-4xl md:text-5xl font-medium text-white italic">MIND & BODY.</span>
              </div>
              <div className="flex flex-col items-center sm:flex-row sm:items-baseline sm:gap-4">
                <span className="text-5xl sm:text-7xl md:text-8xl font-black bg-gradient-to-r from-[#FF1493] via-pink-500 to-[#FF1493] bg-clip-text text-transparent leading-none">ELEVATE</span>
                <span className="text-2xl sm:text-4xl md:text-5xl font-medium text-white italic">LIFE.</span>
              </div>
            </h1>
            <h2 className="text-xl sm:text-3xl md:text-4xl text-white/90 mb-6 font-light tracking-wide flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 justify-center">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl sm:text-3xl md:text-4xl font-normal text-white">Custom Training Programs</span>
              </div>
              <span className="hidden sm:inline mx-4 text-[#FF1493]">|</span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl sm:text-3xl md:text-4xl font-normal text-white">Expert Guidance</span>
              </div>
              <span className="hidden sm:inline mx-4 text-[#FF1493]">|</span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl sm:text-3xl md:text-4xl font-normal text-white">Real Accountability</span>
              </div>
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link
                to="/train"
                className="inline-flex items-center justify-center w-full sm:w-auto px-12 py-4 text-lg font-bold rounded-lg bg-gradient-to-r from-jme-cyan to-jme-purple text-white hover:from-jme-purple hover:to-jme-cyan transition-all transform hover:scale-105 uppercase tracking-wide shadow-lg mt-8"
              >
                Train With Me
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Welcome Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-extrabold text-center mb-6 uppercase tracking-wider bg-gradient-to-r from-jme-purple via-purple-600 to-jme-cyan bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
            Transform Your Life with JMEFit!
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Get started with one of our monthly subscription app-based or standalone training programs below:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <Link to="/shred-waitlist" className="group relative aspect-video overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=1200&q=80"
                alt="SHRED Challenge"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white uppercase tracking-wide">SHRED Challenge</h3>
              </div>
            </Link>
            <Link to="/nutrition-programs" className="group relative aspect-video overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&w=1200&q=80"
                alt="Nutrition Programs"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white uppercase tracking-wide">Nutrition Programs</h3>
              </div>
            </Link>
            <Link to="/monthly-app" className="group relative aspect-video overflow-hidden rounded-lg" id="monthly-membership">
              <img 
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80"
                alt="Monthly Membership"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white uppercase tracking-wide">Monthly Membership</h3>
              </div>
            </Link>
            <Link to="/shop" className="group relative aspect-video overflow-hidden rounded-lg" id="merch-section">
              <img 
                src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80"
                alt="Nutrition"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white uppercase tracking-wide mb-2">MERCH</h3>
                  <span className="inline-block bg-green-500 text-white text-sm px-3 py-1 rounded-full">Coming Soon</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>


      
      {/* Community Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 uppercase tracking-wide bg-gradient-to-r from-black to-jme-purple bg-clip-text text-transparent">
            Join the JMEFit Community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <MessageSquare className="w-16 h-16 text-jme-purple mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4">Direct Messaging With Jaime</h3>
              <p className="text-gray-600">
                Gain exclusive access to direct messaging with Jaime and her support team (plan-dependent).
              </p>
            </div>
            <div>
              <AppWindow className="w-16 h-16 text-jme-purple mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4">Members-Only App</h3>
              <p className="text-gray-600">
                Stay on top of your workouts, track your stats, and get support in the JME app.
              </p>
            </div>
            <div>
              <Users className="w-16 h-16 text-jme-purple mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4">Private Facebook Community</h3>
              <p className="text-gray-600">
                Our awesome community will help you stay motivated and accountable.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Journey Banner */}
      <div className="relative bg-fixed bg-cover bg-center py-40"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider mb-8">
            Start Your Journey Towards the Best Version of Yourself!
          </h2>
          <Link
            to="/train"
            className="inline-flex items-center px-12 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-jme-purple to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-105 uppercase tracking-wide shadow-lg"
          >
            Get Started Today
          </Link>
        </div>
      </div>
      
      {/* App Preview */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 uppercase tracking-wide mb-6">
              Your Training Journey Made Simple
            </h2>
            <p className="text-xl text-gray-600">
              Track your workouts, nutrition, and progress all in one place
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <img
              src="/IMG_3190.PNG"
              alt="Workout tracking"
              className="rounded-2xl shadow-2xl transform hover:scale-105 transition-all"
            />
            <img
              src="/IMG_3186.PNG"
              alt="Progress tracking"
              className="rounded-2xl shadow-2xl transform hover:scale-105 transition-all"
            />
            <img
              src="/IMG_3185.PNG"
              alt="Nutrition tracking"
              className="rounded-2xl shadow-2xl transform hover:scale-105 transition-all"
            />
          </div>
        </div>
      </div>
      
      {/* Footer CTA */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-8 uppercase tracking-wide bg-gradient-to-r from-blue-500 via-purple-600 to-blue-400 bg-clip-text text-transparent drop-shadow-lg" style={{textShadow: '0 0 5px rgba(100, 100, 255, 0.3)'}}>
              Ready to Transform Your Life?
            </h2>
            <Link
              to="/programs"
              className="inline-flex items-center px-12 py-4 text-lg font-bold rounded-full bg-gradient-to-r from-jme-purple to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-105 uppercase tracking-wide shadow-lg"
            >
              Join Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default Home;