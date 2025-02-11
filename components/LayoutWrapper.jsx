'use client'
// components/LayoutWrapper.js

import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/app/redux/store';
import Header from './Layout/Header';
import Sidebar from './Layout/Sidebar';
import Footer from './Layout/Footer';
// import Header from './Header';
// import Sidebar from './Sidebar';
// import Footer from './Footer';

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
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content Area */}
        <div className="flex flex-1 mt-16"> {/* Add margin-top to account for fixed header */}
          {/* Sidebar */}
          <Sidebar isSidebarOpen={isSidebarOpen} />

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
        <Footer />
      </div>
    </Provider>
  );
};

export default LayoutWrapper;
