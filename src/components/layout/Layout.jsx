import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { gsap } from 'gsap';

const Layout = () => {
  const mainRef = useRef(null);

  useEffect(() => {
    // Simple fade-in animation for main content
    gsap.from(mainRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.7,
      ease: "power2.out"
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main ref={mainRef} className="flex-grow pt-[70px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;