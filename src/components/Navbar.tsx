'use client';

import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Burger Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-gray-200"
          >
            <FaBars className="h-6 w-6" />
          </button>

          {/* Logo/Brand */}
          <div className="text-xl font-bold text-white">
            SoundSpire
          </div>

          {/* Logout */}
          <div className="flex items-center gap-4">
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Menu */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 bg-black overflow-auto ease-in-out transition-all duration-300 z-30`}
      >
        <div className="p-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Menu</h2>
            <ul className="space-y-2">
              <li className="text-gray-200">Home</li>
              <li className="text-gray-200">Explore</li>
              <li className="text-gray-200">Library</li>
              <li className="text-gray-200">Settings</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar; 