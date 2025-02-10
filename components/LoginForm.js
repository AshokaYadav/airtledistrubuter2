'use client';

import { loginUser } from '@/app/redux/slices/authSlice';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function LoginForm() {
  const [password, setPassword] = useState('');
  const [mobileno, setmobileno] = useState(''); // mobileno number state
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ mobileno, password })); // Send mobileno and password for login
    redirect('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
      
      {error && <p className="text-red-500 text-center mb-4">{error.message}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="mobileno" className="block text-sm font-medium text-gray-700">mobileno Number</label>
          <input
            type="tel" // Using 'tel' for phone number input
            id="mobileno"
            value={mobileno}
            onChange={(e) => setmobileno(e.target.value)}
            required
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full py-3 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all disabled:bg-gray-400"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
