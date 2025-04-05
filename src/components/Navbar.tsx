'use client';

import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { FiSun, FiMoon } from 'react-icons/fi';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navbar = ({ isDarkMode, toggleTheme }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Burger Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
          >
            <FaBars className="h-6 w-6" />
          </button>

          {/* Logo/Brand */}
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            SoundSpire
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
          >
            {isDarkMode ? (
              <FiSun className="h-6 w-6" />
            ) : (
              <FiMoon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Sidebar Menu */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 bg-white dark:bg-gray-800 overflow-auto ease-in-out transition-all duration-300 z-30`}
      >
        <div className="p-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Menu</h2>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-300">Home</li>
              <li className="text-gray-600 dark:text-gray-300">Explore</li>
              <li className="text-gray-600 dark:text-gray-300">Library</li>
              <li className="text-gray-600 dark:text-gray-300">Settings</li>
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