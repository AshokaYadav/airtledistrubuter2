// components/Header.js

import { useState } from 'react';
import Link from 'next/link';

const Header = ({ isSidebarOpen, toggleSidebar }) => {
  const sidebarWidth = 256; // Sidebar width (can adjust if needed)
  const transitionDuration = '0.3s'; // Transition duration for sidebar and main content

  return (
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
  );
};

export default Header;
