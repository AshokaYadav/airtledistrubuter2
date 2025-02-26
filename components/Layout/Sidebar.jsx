import Link from 'next/link';
import { useState } from 'react'; // Import useState for managing dropdown state

const Sidebar = ({ isSidebarOpen }) => {
  const sidebarWidth = 256; // Sidebar width (can adjust if needed)
  const transitionDuration = '0.3s'; // Transition duration for sidebar
  const [isBankDropdownOpen, setIsBankDropdownOpen] = useState(false); // State for dropdown

  // Toggle dropdown visibility
  const toggleBankDropdown = () => {
    setIsBankDropdownOpen(!isBankDropdownOpen);
  };

  return (
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
          {/* Bank Management Dropdown */}
          <div>
            <div
              onClick={toggleBankDropdown}
              className="flex justify-between items-center hover:bg-gray-700 p-2 rounded cursor-pointer"
            >
              <span>Bank Management</span>
              <span>{isBankDropdownOpen ? '▲' : '▼'}</span> {/* Dropdown icon */}
            </div>
            {/* Dropdown Content */}
            {isBankDropdownOpen && (
              <div className="pl-4 mt-2 space-y-2">
                <Link href="/bank" className="block hover:bg-gray-700 p-2 rounded">
                  Bank
                </Link>
                <Link href="/transaction" className="block hover:bg-gray-700 p-2 rounded">
                  Transaction
                </Link>
              </div>
            )}
          </div>

          {/* Other Links */}
          <Link href="/distributor" className="block hover:bg-gray-700 p-2 rounded">
            Distributor
          </Link>
          <Link href="/collector" className="block hover:bg-gray-700 p-2 rounded">
            Collector
          </Link>
          <Link href="/shops" className="block hover:bg-gray-700 p-2 rounded">
            Shops
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;