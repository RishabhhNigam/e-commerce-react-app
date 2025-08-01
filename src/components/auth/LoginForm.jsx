import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';

// Validation schema for the form
const schema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
}).required();

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef(null);
  const [error, setError] = useState('');
  
  // Get the redirect path from location state or default to homepage
  const from = location.state?.from?.pathname || '/';
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  
  // GSAP animation for the form
  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.from(".login-container", {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });
    
    tl.from(".form-group", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.2,
      ease: "power2.out"
    }, "-=0.4");
    
    tl.from(".login-btn", {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.7)"
    }, "-=0.2");
    
    return () => {
      tl.kill();
    };
  }, []);
  
  const onSubmit = (data) => {
    const result = login(data.username, data.password);
    
    if (result.success) {
      // Successful login animation
      gsap.to(formRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          navigate(from, { replace: true });
        }
      });
    } else {
      // Error animation
      setError(result.message);
      gsap.fromTo(".error-message", 
        { x: -10, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100">
      <div className="login-container bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">
          Login to All in One Solutions
        </h2>
        
        {error && (
          <div className="error-message mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="form-group">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register('username')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
          
          <button
            type="submit"
            className="login-btn w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In
          </button>
          
          <div className="text-sm text-center text-gray-600 mt-4">
            <p>
              Demo Credentials:
              <br />
              Admin: username: admin, password: admin123
              <br />
              User: username: user1, password: user123
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;