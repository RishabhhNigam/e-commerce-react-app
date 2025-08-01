import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const AboutPage = () => {
  useEffect(() => {
    // GSAP animations for page elements
    gsap.from('.page-title', {
      opacity: 0,
      y: -20,
      duration: 0.6,
      ease: 'power2.out'
    });
    
    gsap.from('.about-content', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.2,
      ease: 'power2.out'
    });
    
    gsap.from('.team-section', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.4,
      ease: 'power2.out'
    });
    
    gsap.from('.team-member', {
      opacity: 0,
      scale: 0.9,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.6,
      ease: 'back.out(1.2)'
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="page-title text-4xl font-bold text-center text-gray-900 mb-10">About All in One Solutions</h1>
        
        <div className="about-content max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-700 mb-6">
                Founded in 2015, All in One Solutions started as a small computer parts shop in Bangalore. 
                What began as a passion project quickly grew into one of India's most trusted destinations for 
                quality computer products and accessories.
              </p>
              <p className="text-gray-700 mb-6">
                We believe in providing the highest quality computer products at competitive prices. 
                Our team of tech enthusiasts carefully selects each product to ensure it meets our rigorous 
                standards of performance, reliability, and value.
              </p>
              <p className="text-gray-700">
                Today, we serve thousands of customers across India, from individual consumers 
                to businesses and educational institutions. Our dedication to excellent customer service 
                and technical support has earned us a loyal customer base and numerous industry accolades.
              </p>
            </div>
            
            <div className="md:w-1/3">
              <div className="rounded-lg overflow-hidden shadow-md">
                <img 
                  src="/images/Storefront.jpg"
                  alt="Our Store" 
                  className="w-full h-auto"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300?text=Our+Store";
                  }}
                />
              </div>
            </div>
          </div>
          
          <hr className="my-8 border-gray-200" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Assurance</h3>
              <p className="text-gray-600">
                We source only genuine products directly from manufacturers and authorized distributors.
              </p>
            </div>
            
            <div className="text-center p-4">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Enjoy quick delivery across India with secure packaging and real-time tracking.
              </p>
            </div>
            
            <div className="text-center p-4">
              <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Technical Support</h3>
              <p className="text-gray-600">
                Get expert technical assistance before and after your purchase.
              </p>
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="team-section max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="team-member bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="h-32 w-32 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                  <img 
                    src="/images/VikramMehta.jpg"
                    alt="Vikram Mehta - CEO" 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/128?text=CEO";
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center">Vikram Mehta</h3>
                <p className="text-blue-600 text-center mb-4">CEO & Founder</p>
                <p className="text-gray-600 text-center">
                  A tech enthusiast with 15+ years of experience in the computer hardware industry.
                </p>
              </div>
            </div>
            
            <div className="team-member bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="h-32 w-32 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                  <img 
                    src="/images/PriyaSharma.jpg"
                    alt="Priya Sharma - COO" 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/128?text=COO";
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center">Priya Sharma</h3>
                <p className="text-blue-600 text-center mb-4">Chief Operations Officer</p>
                <p className="text-gray-600 text-center">
                  Operations expert ensuring smooth delivery and customer satisfaction.
                </p>
              </div>
            </div>
            
            <div className="team-member bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="h-32 w-32 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                  <img 
                    src="/images/RajKumar.jpg"
                    alt="Raj Kumar - CTO" 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/128?text=CTO";
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center">Raj Kumar</h3>
                <p className="text-blue-600 text-center mb-4">Chief Technical Officer</p>
                <p className="text-gray-600 text-center">
                  Tech guru who leads our product selection and quality assurance teams.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 bg-blue-600 rounded-lg shadow-xl overflow-hidden">
          <div className="p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Shop with Us?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Explore our wide range of quality computer products at competitive prices. 
              Get fast delivery and excellent customer service.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;