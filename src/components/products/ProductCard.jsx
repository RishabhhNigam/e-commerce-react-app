import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { gsap } from 'gsap';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const cardRef = useRef(null);
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    
    // Animation for adding to cart
    const button = e.currentTarget;
    gsap.to(button, {
      scale: 0.9,
      duration: 0.1,
      onComplete: () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.1
        });
      }
    });
    
    addToCart(product);
    
    // Notification animation
    gsap.to(".cart-notification", {
      y: -10,
      opacity: 1,
      duration: 0.3,
      onComplete: () => {
        setTimeout(() => {
          gsap.to(".cart-notification", {
            y: 0,
            opacity: 0,
            duration: 0.3
          });
        }, 1500);
      }
    });
  };

  // Placeholder image if product image is not available
  const fallbackImage = "https://via.placeholder.com/300x200?text=Product+Image";
  
  // Format price in Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  useEffect(() => {
    // Animation on hover
    const card = cardRef.current;
    
    const hoverEnter = () => {
      gsap.to(card, {
        y: -10,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        duration: 0.3
      });
    };
    
    const hoverLeave = () => {
      gsap.to(card, {
        y: 0,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        duration: 0.3
      });
    };
    
    card.addEventListener('mouseenter', hoverEnter);
    card.addEventListener('mouseleave', hoverLeave);
    
    return () => {
      card.removeEventListener('mouseenter', hoverEnter);
      card.removeEventListener('mouseleave', hoverLeave);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300"
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="h-48 overflow-hidden">
          <img 
            src={product.image || fallbackImage} 
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
            onError={(e) => {
              e.target.src = fallbackImage;
            }}
          />
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg text-gray-800 line-clamp-2 h-14">{product.name}</h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {product.category}
            </span>
          </div>
          
          <div className="mt-3 flex justify-between items-center">
            <p className="text-xl font-bold text-gray-900">{formatPrice(product.price)}</p>
            <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
            </p>
          </div>
          
          <p className="mt-2 text-gray-600 text-sm line-clamp-3">{product.description}</p>
          
          {currentUser && (
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className={`mt-4 w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-white font-medium transition-colors ${
                product.stock > 0 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              <ShoppingCartIcon className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </Link>
      
      {/* Cart notification - hidden by default */}
      <div className="cart-notification fixed top-20 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 opacity-0 z-50 shadow-md">
        Item added to cart!
      </div>
    </div>
  );
};

export default ProductCard;