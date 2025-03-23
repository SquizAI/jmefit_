import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, ShoppingCart, ChevronDown, User, LogOut } from 'lucide-react';
import CartDropdown from './CartDropdown';
import { useCartStore } from '../store/cart';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const location = useLocation();
  const { items } = useCartStore();
  const { user, signOut } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;

  const toggleSubmenu = (menu: string) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center h-16 py-2 transition-transform duration-300 hover:scale-105">
              <img 
                src="/JME_fit_black_purple.png"
                alt="JmeFit Training"
                className="h-12 w-auto"
              />
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center space-x-6">
            <Link
              to="/"
              className={`relative text-sm font-medium transition-all duration-300 group py-2 ${
                isActive('/')
                  ? 'text-[#FF1493]'
                  : 'text-gray-600 hover:text-[#FF1493]'
              }`}
            >
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#FF1493] transition-all duration-300 group-hover:w-full" />
              Home
            </Link>
            <Link
              to="/programs"
              className={`relative text-sm font-medium transition-all duration-300 group py-2 ${
                isActive('/programs')
                  ? 'text-[#FF1493]'
                  : 'text-gray-600 hover:text-[#FF1493]'
              }`}
            >
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#FF1493] transition-all duration-300 group-hover:w-full" />
              Programs
            </Link>
            <Link
              to="/monthly-app"
              className={`relative text-sm font-medium transition-all duration-300 group py-2 ${
                isActive('/monthly-app')
                  ? 'text-[#FF1493]'
                  : 'text-gray-600 hover:text-[#FF1493]'
              }`}
            >
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#FF1493] transition-all duration-300 group-hover:w-full" />
              Monthly App
            </Link>
            <Link
              to="/nutrition-programs"
              className={`relative text-sm font-medium transition-all duration-300 group py-2 ${
                isActive('/nutrition-programs')
                  ? 'text-[#FF1493]'
                  : 'text-gray-600 hover:text-[#FF1493]'
              }`}
            >
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#FF1493] transition-all duration-300 group-hover:w-full" />
              Nutrition Programs
            </Link>
            <Link
              to="/community"
              className={`relative text-sm font-medium transition-all duration-300 group py-2 ${
                isActive('/community')
                  ? 'text-[#FF1493]'
                  : 'text-gray-600 hover:text-[#FF1493]'
              }`}
            >
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#FF1493] transition-all duration-300 group-hover:w-full" />
              Community
            </Link>
            <Link
              to="/blog"
              className={`relative text-sm font-medium transition-all duration-300 group py-2 ${
                isActive('/blog')
                  ? 'text-[#FF1493]'
                  : 'text-gray-600 hover:text-[#FF1493]'
              }`}
            >
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#FF1493] transition-all duration-300 group-hover:w-full" />
              Blog
            </Link>
            <div className="flex items-center space-x-6 ml-8">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-jme-purple/10 to-purple-100 hover:from-jme-purple/20 hover:to-purple-200 text-gray-900 transition-all duration-300 transform hover:scale-105"
                  >
                    <User className="w-5 h-5" />
                    <span className="text-sm font-medium">{user.user_metadata.full_name || 'Account'}</span>
                  </button>
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg py-2 z-50 border border-purple-100 animate-in fade-in duration-200">
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-jme-purple/10 hover:to-purple-100 transition-colors duration-200"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                      <button
                        onClick={async () => {
                          await signOut();
                          setIsProfileOpen(false);
                          toast.success('Signed out successfully');
                        }}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/auth"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-jme-purple transition-all duration-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/programs"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-jme-purple to-purple-600 hover:from-purple-600 hover:to-jme-purple transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Get Started
                  </Link>
                </div>
              )}
              <div className="relative">
                <button
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="text-jme-purple hover:text-purple-700 transition-all duration-300 transform hover:scale-110 relative"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-jme-purple to-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-md">
                      {items.length}
                    </span>
                  )}
                </button>
              </div>
              <a 
                href="https://www.instagram.com/jmefit_/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#E1306C] hover:text-[#C13584] transition-all duration-300 transform hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com/jmefit" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#1877F2] hover:text-[#166FE5] transition-all duration-300 transform hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`md:hidden fixed inset-0 top-20 bg-white z-40 transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="h-full overflow-y-auto">
            <div className="px-4 py-6 space-y-2">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive('/')
                    ? 'bg-jme-purple text-white'
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
              >
                Home
              </Link>

              {/* Programs Accordion */}
              <div className="rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSubmenu('programs')}
                  className={`w-full flex items-center justify-between px-4 py-3 text-base font-medium transition-colors ${
                    activeSubmenu === 'programs'
                      ? 'bg-jme-purple text-white'
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span>Programs</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${
                    activeSubmenu === 'programs' ? 'rotate-180' : ''
                  }`} />
                </button>
                <div className={`transition-all duration-300 ${
                  activeSubmenu === 'programs'
                    ? 'max-h-48 opacity-100'
                    : 'max-h-0 opacity-0 overflow-hidden'
                }`}>
                  <Link
                    to="/monthly-app"
                    onClick={() => setIsOpen(false)}
                    className="block px-8 py-2 text-gray-600 hover:text-jme-purple"
                  >
                    Monthly App
                  </Link>
                  <Link
                    to="/standalone-programs"
                    onClick={() => setIsOpen(false)}
                    className="block px-8 py-2 text-gray-600 hover:text-jme-purple"
                  >
                    Standalone Programs
                  </Link>
                  <Link
                    to="/programs"
                    onClick={() => setIsOpen(false)}
                    className="block px-8 py-2 text-gray-600 hover:text-jme-purple"
                  >
                    View All Programs
                  </Link>
                </div>
              </div>

              <Link
                to="/community"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive('/community')
                    ? 'bg-jme-purple text-white'
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
              >
                Community
              </Link>
              <Link
                to="/blog"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive('/blog')
                    ? 'bg-jme-purple text-white'
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
              >
                Blog
              </Link>
            </div>

            {/* Social Links */}
            <div className="absolute bottom-0 left-0 right-0 border-t bg-gray-50">
              {/* User Authentication */}
              <div className="p-4 border-b">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100">
                      <User className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">
                        {user.user_metadata.full_name || 'Account'}
                      </span>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      <User className="w-4 h-4 inline mr-2" />
                      Dashboard
                    </Link>
                    <button
                      onClick={async () => {
                        await signOut();
                        setIsOpen(false);
                        toast.success('Signed out successfully');
                      }}
                      className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <LogOut className="w-4 h-4 inline mr-2" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link
                      to="/auth"
                      onClick={() => setIsOpen(false)}
                      className="block w-full px-4 py-2 text-center text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/auth?mode=signup"
                      onClick={() => setIsOpen(false)}
                      className="block w-full px-4 py-2 text-center text-white bg-jme-purple hover:bg-purple-700 rounded-lg"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
              {/* Social Links */}
              <div className="flex justify-center space-x-8">
              <a 
                href="https://www.instagram.com/jmefit_/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#E1306C] hover:text-[#C13584] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com/jmefit" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#1877F2] hover:text-[#166FE5] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              </div>
            </div>
          </div>
          </div>
        </div>
      </nav>
      {/* Cart dropdown positioned outside the navigation */}
      <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default Navigation;