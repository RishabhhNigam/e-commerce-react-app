import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { gsap } from 'gsap';
import { ArrowLeftIcon, ShoppingCartIcon, CheckIcon } from '@heroicons/react/24/outline';

const ProductDetail = () => {
  const { productId } = useParams();
  const { products } = useProducts();
  const { addToCart, cart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  
  // Find the product based on the ID from the URL
  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(productId));
    
    if (foundProduct) {
      setProduct(foundProduct);
      // Check if product is already in cart
      const cartItem = cart.find(item => item.id === foundProduct.id);
      setIsInCart(!!cartItem);
    }
  }, [productId, products, cart]);
  
  // GSAP animations
  useEffect(() => {
    if (product) {
      const tl = gsap.timeline();
      
      tl.from(imageRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });
      
      tl.from(contentRef.current, {
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6");
    }
  }, [product]);
  
  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(Math.max(1, Math.min(value, product?.stock || 1)));
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    
    setIsInCart(true);
    
    // Animation
    gsap.to(".success-message", {
      y: -10,
      opacity: 1,
      duration: 0.3,
      onComplete: () => {
        setTimeout(() => {
          gsap.to(".success-message", {
            y: 0,
            opacity: 0,
            duration: 0.3
          });
        }, 2000);
      }
    });
  };
  
  // Format price in Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <button 
          onClick={() => navigate('/products')}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Products
        </button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button 
          onClick={() => navigate('/products')}
          className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Products
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div ref={imageRef} className="bg-white p-6 rounded-lg shadow-md">
          <img 
            src={product.image || "https://via.placeholder.com/600x400?text=Product+Image"} 
            alt={product.name}
            className="w-full h-auto object-contain rounded-md"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/600x400?text=Product+Image";
            }}
          />
        </div>
        
        {/* Product Details */}
        <div ref={contentRef} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
              {product.category}
            </span>
          </div>
          
          <div className="mt-6">
            <p className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</p>
            <p className={`mt-2 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </p>
          </div>
          
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900">Description</h3>
            <p className="mt-2 text-gray-600">{product.description}</p>
          </div>
          
          {currentUser && product.stock > 0 && (
            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="flex items-center space-x-4 mb-6">
                <label htmlFor="quantity" className="text-gray-700 font-medium">
                  Quantity:
                </label>
                <div className="relative inline-block">
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="w-full py-3 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-colors flex items-center justify-center space-x-2"
              >
                {isInCart ? (
                  <>
                    <CheckIcon className="h-5 w-5" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingCartIcon className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
              
              {/* Success message (hidden by default) */}
              <div className="success-message fixed top-20 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 opacity-0 z-50 shadow-md">
                Added {quantity} item{quantity > 1 ? 's' : ''} to cart!
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;