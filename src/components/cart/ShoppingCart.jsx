import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { gsap } from 'gsap';
import { XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

const ShoppingCart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();
  const cartRef = useRef(null);
  
  // GSAP animations
  useEffect(() => {
    // Animate cart items
    gsap.from(".cart-item", {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out"
    });
    
    gsap.from(".cart-summary", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      delay: 0.3,
      ease: "power2.out"
    });
  }, []);

  // Format price in Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  // Handle quantity change for cart item
  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return;
    if (newQuantity > item.stock) return;
    
    updateQuantity(item.id, newQuantity);
  };
  
  // Handle removing item from cart with animation
  const handleRemoveItem = (itemId) => {
    const itemElement = document.getElementById(`cart-item-${itemId}`);
    
    gsap.to(itemElement, {
      x: -30,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        removeFromCart(itemId);
      }
    });
  };
  
  // Handle checkout process
  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Animate transition to checkout
    gsap.to(cartRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        navigate('/checkout');
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8" ref={cartRef}>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBagIcon className="mx-auto h-16 w-16 text-gray-400" />
          <h2 className="mt-4 text-2xl font-medium text-gray-900">Your cart is empty</h2>
          <p className="mt-2 text-gray-500">Looks like you haven't added any products yet.</p>
          <button
            onClick={() => navigate('/products')}
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li 
                    key={item.id} 
                    id={`cart-item-${item.id}`}
                    className="cart-item p-4 flex flex-col sm:flex-row items-center sm:justify-between"
                  >
                    <div className="flex items-center sm:w-1/2">
                      <div className="w-20 h-20 flex-shrink-0">
                        <img 
                          src={item.image || "https://via.placeholder.com/80?text=Product"} 
                          alt={item.name}
                          className="w-full h-full object-cover rounded-md"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/80?text=Product";
                          }}
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-gray-500 text-sm">{formatPrice(item.price)} each</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          className="px-2 py-1 text-gray-600 hover:text-gray-900"
                          onClick={() => handleQuantityChange(item, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="px-2 py-1 min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          className="px-2 py-1 text-gray-600 hover:text-gray-900"
                          onClick={() => handleQuantityChange(item, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                      
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-gray-400 hover:text-red-500 focus:outline-none"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 cart-summary">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              
              <div className="flow-root">
                <dl className="-my-4 text-sm divide-y divide-gray-200">
                  <div className="py-4 flex justify-between">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd className="font-medium text-gray-900">{formatPrice(getCartTotal())}</dd>
                  </div>
                  <div className="py-4 flex justify-between">
                    <dt className="text-gray-600">Shipping</dt>
                    <dd className="font-medium text-gray-900">Free</dd>
                  </div>
                  <div className="py-4 flex justify-between">
                    <dt className="text-base font-medium text-gray-900">Total</dt>
                    <dd className="text-base font-medium text-gray-900">{formatPrice(getCartTotal())}</dd>
                  </div>
                </dl>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`w-full py-3 px-4 ${
                    isCheckingOut 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white font-medium rounded-md shadow-sm transition-colors`}
                >
                  {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                </button>
              </div>
              
              <div className="mt-4">
                <button
                  onClick={() => navigate('/products')}
                  className="w-full py-3 px-4 bg-white border border-gray-300 text-gray-700 font-medium rounded-md shadow-sm hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;