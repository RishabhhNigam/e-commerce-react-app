import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { gsap } from 'gsap';

const Header = () => {
  const { currentUser, logout, isAdmin } = useAuth();
  const { getCartItemCount } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const logoRef = useRef(null);

  // GSAP animation for header elements
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.from(logoRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)"
    });
    
    tl.from(".nav-item", {
      y: -20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.4");
    
    // Subtle header animation on scroll
    const handleScroll = () => {
      if (window.scrollY > 10) {
        gsap.to(headerRef.current, {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          height: "60px",
          duration: 0.3,
        });
      } else {
        gsap.to(headerRef.current, {
          backgroundColor: "rgba(255, 255, 255, 1)",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
          height: "70px",
          duration: 0.3,
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Animation for mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      gsap.fromTo(".mobile-menu", 
        { x: -300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [mobileMenuOpen]);

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 bg-white shadow-md h-[70px] z-50 transition-all duration-300"
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center" ref={logoRef}>
          <div className="text-2xl font-bold text-blue-700 flex items-center">
            <span className="bg-blue-600 text-white p-2 rounded-md mr-2">AIO</span>
            <span>All in One Solutions</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" className={({isActive}) => 
            `nav-item text-base font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`
          }>
            Home
          </NavLink>
          <NavLink to="/products" className={({isActive}) => 
            `nav-item text-base font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`
          }>
            Products
          </NavLink>
          <NavLink to="/about" className={({isActive}) => 
            `nav-item text-base font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`
          }>
            About Us
          </NavLink>
          <NavLink to="/locations" className={({isActive}) => 
            `nav-item text-base font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`
          }>
            Our Stores
          </NavLink>
        </nav>
        
        {/* Right Side Items */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon with Badge */}
          {currentUser && (
            <Link to="/cart" className="nav-item relative p-2 hover:bg-gray-100 rounded-full">
              <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </Link>
          )}
          
          {/* User Menu */}
          {currentUser ? (
            <div className="nav-item relative flex items-center space-x-2">
              <div className="hidden md:block">
                <span className="text-sm font-medium text-gray-700">
                  Hello, {currentUser.username}
                </span>
              </div>
              <div className="flex space-x-2">
                {isAdmin() && (
                  <Link 
                    to="/admin" 
                    className="hidden md:block px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="nav-item flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <UserIcon className="h-5 w-5" />
              <span>Login</span>
            </Link>
          )}
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? 
              <XMarkIcon className="h-6 w-6" /> : 
              <Bars3Icon className="h-6 w-6" />
            }
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu md:hidden fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50 pt-20 px-4">
          <div className="flex flex-col space-y-4">
            <NavLink 
              to="/" 
              className={({isActive}) => 
                `p-3 rounded-md ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/products" 
              className={({isActive}) => 
                `p-3 rounded-md ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </NavLink>
            <NavLink 
              to="/about" 
              className={({isActive}) => 
                `p-3 rounded-md ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </NavLink>
            <NavLink 
              to="/locations" 
              className={({isActive}) => 
                `p-3 rounded-md ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Our Stores
            </NavLink>
            {currentUser && isAdmin() && (
              <NavLink 
                to="/admin" 
                className={({isActive}) => 
                  `p-3 rounded-md ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin Panel
              </NavLink>
            )}
          </div>
        </div>
      )}
      
      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;