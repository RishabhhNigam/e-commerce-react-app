import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/products/ProductCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const { products } = useProducts();
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const categoriesRef = useRef(null);
  const testimonialsRef = useRef(null);
  
  // Get featured products (first 4 products)
  const featuredProducts = products.slice(0, 4);
  
  // GSAP animations
  useEffect(() => {
    // Hero section animation
    gsap.from(heroRef.current.querySelector('.hero-content'), {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
    
    gsap.from(heroRef.current.querySelector('.hero-image'), {
      x: 50,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out'
    });
    
    // Featured products animation (triggered on scroll)
    gsap.from(featuredRef.current.querySelectorAll('.product-card'), {
      y: 50,
      opacity: 0,
      duration: 0.7,
      stagger: 0.2,
      scrollTrigger: {
        trigger: featuredRef.current,
        start: 'top 80%',
      }
    });
    
    // Categories animation (triggered on scroll)
    gsap.from(categoriesRef.current.querySelectorAll('.category-card'), {
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      scrollTrigger: {
        trigger: categoriesRef.current,
        start: 'top 80%',
      }
    });
    
    // Testimonials animation (triggered on scroll)
    gsap.from(testimonialsRef.current.querySelectorAll('.testimonial-card'), {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.2,
      scrollTrigger: {
        trigger: testimonialsRef.current,
        start: 'top 80%',
      }
    });
  }, []);
  
  return (
    <div>
      {/* Hero Section */}
      <section ref={heroRef} className="bg-gradient-to-r from-red-50 to-indigo-50 py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 hero-content">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your One-Stop Computer Solutions
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Discover the latest tech products at competitive prices. Quality products with excellent customer service.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-colors"
              >
                Shop Now
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 bg-black border border-gray-300 text-gray-700 font-medium rounded-md shadow-sm hover:bg-gray-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 hero-image">
            <img 
              src="https://i.imgur.com/JVLZTyt.jpg" 
              alt="Computer Setup" 
              className="rounded-lg shadow-xl"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/600x400?text=Computer+Setup";
              }}
            />
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section ref={featuredRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Check out our most popular products that customers love
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section ref={categoriesRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our collection of products by category
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/products?category=Laptop" className="category-card group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform group-hover:-translate-y-2">
                <div className="h-48 bg-blue-600">
                  <div className="h-full w-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-center">Laptops</h3>
                </div>
              </div>
            </Link>
            
            <Link to="/products?category=Desktop" className="category-card group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform group-hover:-translate-y-2">
                <div className="h-48 bg-indigo-600">
                  <div className="h-full w-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-center">Desktops</h3>
                </div>
              </div>
            </Link>
            
            <Link to="/products?category=Hardware" className="category-card group">
              <div className="bg-black rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform group-hover:-translate-y-2">
                <div className="h-48 bg-purple-600">
                  <div className="h-full w-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-center">Hardware</h3>
                </div>
              </div>
            </Link>
            
            <Link to="/products?category=Accessories" className="category-card group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform group-hover:-translate-y-2">
                <div className="h-48 bg-teal-600">
                  <div className="h-full w-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-center">Accessories</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section ref={testimonialsRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Customer Testimonials</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - see what our customers have to say
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="testimonial-card bg-gray-50 rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-800 font-bold">RS</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">Rahul Singh</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "I've been buying all my computer parts from All in One Solutions for the past 3 years. Their products are authentic and they offer great customer service. Highly recommended!"
              </p>
            </div>
            
            <div className="testimonial-card bg-gray-50 rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-800 font-bold">AP</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">Ananya Patel</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5" fill={i < 4 ? 'currentColor' : 'none'} stroke={i < 4 ? 'none' : 'currentColor'} strokeWidth="1.5" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "The laptop I bought from All in One Solutions exceeded my expectations. The cash on delivery option was very convenient, and the product arrived well-packaged."
              </p>
            </div>
            
            <div className="testimonial-card bg-gray-50 rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-800 font-bold">VK</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">Vikram Kumar</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5" fill={i < 5 ? 'currentColor' : 'none'} stroke={i < 5 ? 'none' : 'currentColor'} strokeWidth="1.5" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "I've been running a small business and All in One Solutions has been our trusted supplier for all computing needs. They have competitive prices and reliable after-sales support."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Banner */}
      <section className="bg-blue-600 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to upgrade your tech?</h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            Shop our wide selection of quality products at competitive prices
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;