import React, { useEffect } from "react";
import Typed from "typed.js";
import { Link,Route,Routes } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";


const LandingPage = () => {
   useEffect(() => {
    const typed = new Typed(".auto-type", {
      strings: [
        "Track Attendance",
        "Monitor Working Hours",
        "Manage Departments",
        "Leave Management",
        "HR Dashboard",
      ],
      typeSpeed: 60,
      backSpeed: 50,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col">
      
      {/* Navbar */}
     <nav className="flex justify-between items-center px-10 py-6 bg-black bg-opacity-30 backdrop-blur-md shadow-lg sticky top-0 z-50">
  <h1 className="text-2xl font-bold text-cyan-400">EMS</h1>
  <div className="flex gap-8 text-lg font-medium">
    <Link
      className="hover:text-cyan-700 cursor-pointer flex items-center gap-2 px-6 py-2 bg-cyan-200 rounded-xl"
      to="/login"
    >
      <FaUser /> Login
    </Link>
  </div>
    </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center flex-1 px-6 py-24">
        <h2 className="text-6xl font-extrabold mb-6 leading-tight">
          The Future of <span className="text-cyan-400">Employee Management</span>
        </h2>
        <h3 className="text-3xl mt-4">
          <span className="auto-type"></span>
        </h3>
        <p className="mt-8 text-gray-300 max-w-3xl text-lg">
          Streamline your HR tasks, monitor employee performance, track working
          hours, and manage leaves with ease—all in one powerful platform.
        </p>
        <div className="mt-10">
          
             <Link className="px-8 py-4 bg-cyan-500 text-black font-semibold rounded-2xl shadow-lg hover:bg-cyan-400 transition text-lg"  to="/login">Login</Link>
          
        </div>
      </section>

      {/* Expanded Features Section */}
      <section className="py-24 px-10 bg-gray-900 grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          {
            title: "Attendance Tracking",
            desc: "Easily track and manage employee attendance with real-time data.",
          },
          {
            title: "Leave Management",
            desc: "Approve or reject leave requests and maintain smooth workflows.",
          },
          {
            title: "Analytics Dashboard",
            desc: "Get detailed insights into working hours, productivity, and more.",
          },
          {
            title: "Department Management",
            desc: "Organize employees into departments and assign roles seamlessly.",
          },
          {
            title: "Payroll Integration",
            desc: "Automate salary calculations based on attendance and leaves.",
          },
          {
            title: "Secure Access",
            desc: "Provide role-based access to HR, Admins, and Employees.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="p-10 bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-xl hover:scale-105 transition-transform min-h-[250px] flex flex-col justify-center"
          >
            <h4 className="text-2xl font-semibold text-cyan-400 mb-4">
              {feature.title}
            </h4>
            <p className="text-gray-300 text-lg">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="py-8 text-center bg-gray-950 text-gray-400 text-sm">
        © {new Date().getFullYear()} Employee Management System | Built with ❤️
      </footer>


     
    </div>
  );
}

export default LandingPage