'use client'
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';
// import { initializeUserFromStorage } from '@/app/redux/slices/authSlice';
import { useEffect } from 'react';
import { initializeUserFromStorage } from './redux/slices/authSlice';
import { redirect } from 'next/navigation';

export default function Home() {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state);
  // console.log(user);
  

  // Check if the user exists in localStorage on mount and initialize Redux state
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      // Dispatch the action to populate Redux state
      dispatch(initializeUserFromStorage()); 
      // Redirect to dashboard only if user data exists
      // redirect('/dashboard');
    }
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <LoginForm />
    </div>
  );
}