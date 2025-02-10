import { useState } from 'react';

const Sidebar = ({ isSidebarOpen }) => {
  return (
    <aside className={`lg:w-64 w-full bg-red-800 text-white p-4 ${isSidebarOpen ? 'block' : 'hidden'} lg:block`}>
      <nav>
        <ul>
          <li>
            <a href="/bank" className="block py-2 px-4 hover:bg-red-700">Bank</a>
          </li>
          <li>
            <a href="/distributor" className="block py-2 px-4 hover:bg-red-700">Distributor</a>
          </li>
          <li>
            <a href="/collector" className="block py-2 px-4 hover:bg-red-700">Collector</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
