import { useEffect } from 'react';
import ProductList from '../components/products/ProductList';
import { gsap } from 'gsap';

const ProductsPage = () => {
  useEffect(() => {
    // Simple fade-in animation for page title
    gsap.from(".products-title", {
      y: -20,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out"
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="products-title text-3xl font-bold text-center mb-8 text-gray-900">
          Our Products
        </h1>
        <ProductList />
      </div>
    </div>
  );
};

export default ProductsPage;