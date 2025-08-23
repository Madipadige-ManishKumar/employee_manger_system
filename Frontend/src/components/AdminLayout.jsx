import React from "react";
import { Link } from "react-router-dom";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <nav className="navbar bg-white shadow px-6 py-3 flex items-center justify-between">
        <Link to="/">
          <img
            src="/images/logo.png" // adjust path if needed
            alt="Logo"
            className="h-12 w-auto rounded"
          />
        </Link>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-72 bg-gradient-to-b from-indigo-700 via-purple-700 to-pink-700 text-white shadow-lg rounded-r-2xl p-6">
          <ul className="space-y-4">
            <li>
              <Link
                to="/adduser"
                className="block text-lg font-medium hover:bg-white/20 rounded-lg px-3 py-2 transition"
              >
                ➕ Add Employee
              </Link>
            </li>
            <li>
              <Link
                to="/emphrs"
                className="block text-lg font-medium hover:bg-white/20 rounded-lg px-3 py-2 transition"
              >
                ⏱ Employee Working Hours
              </Link>
            </li>
            <li>
              <Link
                to="/empdet"
                className="block text-lg font-medium hover:bg-white/20 rounded-lg px-3 py-2 transition"
              >
                👤 Employee Details
              </Link>
            </li>
            <li>
              <Link
                to="/depthrs"
                className="block text-lg font-medium hover:bg-white/20 rounded-lg px-3 py-2 transition"
              >
                🏢 Department Working Hours
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="block text-lg font-medium hover:bg-red-500 rounded-lg px-3 py-2 transition"
              >
                🚪 Logout
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
