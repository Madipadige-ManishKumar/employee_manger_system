// src/components/UserNavbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // icons

const UserNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/emp" className="flex items-center space-x-2">
          <img
            src="/images/logo.png" // place logo in public/images/
            alt="Logo"
            className="h-10 w-auto"
          />
          <span className="text-xl font-bold text-gray-800">EMS</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          <li>
            <Link to="/emp" className="text-gray-700 hover:text-blue-600 font-medium">
              Employee Details
            </Link>
          </li>
          <li>
            <Link to="/apply" className="text-gray-700 hover:text-blue-600 font-medium">
              Apply Leave
            </Link>
          </li>
          <li>
            <Link to="/attreport" className="text-gray-700 hover:text-blue-600 font-medium">
              Attendance Report
            </Link>
          </li>
         
          <li>
            <Link to="/logout" className="text-red-600 hover:text-red-700 font-semibold">
              Logout
            </Link>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-800 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <ul className="flex flex-col space-y-4 p-4">
            <li>
              <Link
                to="/emp"
                onClick={toggleMenu}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Employee Details
              </Link>
            </li>
            <li>
              <Link
                to="/apply"
                onClick={toggleMenu}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Apply Leave
              </Link>
            </li>
            <li>
              <Link
                to="/attreport"
                onClick={toggleMenu}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Attendance Report
              </Link>
            </li>
            
            <li>
              <Link
                to="/logout"
                onClick={toggleMenu}
                className="text-red-600 hover:text-red-700 font-semibold"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
