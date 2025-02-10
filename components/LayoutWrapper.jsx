'use client';

import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/app/redux/store';
import Link from 'next/link';

const LayoutWrapper = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarWidth = 256; // Sidebar width (can adjust if needed)
  const transitionDuration = '0.3s'; // Transition duration for sidebar and main content

  return (
    <Provider store={store}>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header
          className="bg-blue-600 text-white p-4 flex justify-between items-center fixed w-full z-10"
          style={{
            paddingLeft: isSidebarOpen ? `${sidebarWidth}px` : '0', // Adjust header's padding when sidebar is open
            transition: `padding-left ${transitionDuration} ease`, // Smooth transition for header
          }}
        >
          <div className="flex items-center">
            {/* Hamburger Menu Button */}
            <button onClick={toggleSidebar} className="mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            {/* App Logo */}
            <Link href="/" className="text-xl font-bold">
              Airtel Distributor
            </Link>
          </div>
          {/* Navigation Links */}
          <nav className="hidden sm:flex space-x-4">
            <Link href="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
            <Link href="/profile" className="hover:text-gray-300">
              Profile
            </Link>
            <Link href="/settings" className="hover:text-gray-300">
              Settings
            </Link>
          </nav>
        </header>

        {/* Main Content Area */}
        <div className="flex flex-1 mt-16"> {/* Add margin-top to account for fixed header */}
          {/* Sidebar */}
          <div
            className="fixed inset-y-0 left-0 bg-gray-800 text-white z-20"
            style={{
              width: `${sidebarWidth}px`,
              transform: isSidebarOpen ? 'translateX(0)' : `translateX(-100%)`, // Apply smooth sliding
              transition: `transform ${transitionDuration} ease`, // Smooth transition for sidebar
            }}
          >
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Menu</h2>
              <nav className="space-y-2">
                <Link
                  href="/bank"
                  className="block hover:bg-gray-700 p-2 rounded"
                >
                  Bank
                </Link>
                <Link
                  href="/collector"
                  className="block hover:bg-gray-700 p-2 rounded"
                >
                  Distributor
                </Link>
                <Link
                  href="/distributor"
                  className="block hover:bg-gray-700 p-2 rounded"
                >
                  Collector
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <main
            className="flex-1 p-4 bg-gray-100"
            style={{
              paddingLeft: isSidebarOpen ? `${sidebarWidth}px` : '0', // Adjust main content's padding based on sidebar state
              transition: `padding-left ${transitionDuration} ease`, // Smooth transition for main content
            }}
          >
            {children}
          </main>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
        </footer>
      </div>
    </Provider>
  );
};

export default LayoutWrapper;