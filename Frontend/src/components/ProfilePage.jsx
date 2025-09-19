import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import UserNavbar from "./UserNavbar";
import { UserContext } from "../context/UserContext"; 

const ProfilePage = () => {
  const { user } = useContext(UserContext); 

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <UserNavbar />

      {/* Futuristic Gradient Background */}
      <span className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-800 opacity-90 blur-xl -z-10"></span>

      {/* Main Container */}
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 p-6 mt-20">
        
        {/* Profile Section */}
        <section className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-6 hover:shadow-blue-500/50 transition">
          <CgProfile className="text-6xl text-indigo-300 mb-4" />
          <div className="mt-4 text-center">
            <h1 className="text-2xl font-bold text-white">{user.U_name}</h1>
            <p className="text-indigo-300 font-medium">{user.Designation}</p>
            <a
              href="/enter_p"
              className="inline-block mt-3 px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 text-white text-sm rounded-lg shadow-lg transition"
            >
              Change Password
            </a>
          </div>
        </section>

        {/* User Details */}
        <section className="md:col-span-2 bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-6 hover:shadow-purple-500/50 transition">
          <h2 className="text-xl font-bold text-indigo-300 border-b border-white/20 pb-3 mb-6">
            Employee Information
          </h2>

          <ul className="space-y-4">
            <li className="flex justify-between items-center bg-white/5 p-4 rounded-lg border border-white/10">
              <span className="font-semibold text-gray-200">Department:</span>
              <span className="text-gray-100">{user.Department_Working}</span>
            </li>
            <li className="flex justify-between items-center bg-white/5 p-4 rounded-lg border border-white/10">
              <span className="font-semibold text-gray-200">Reporting Manager:</span>
              <span className="text-gray-100">{user.Reporting_Manager}</span>
            </li>
            <li className="flex justify-between items-center bg-white/5 p-4 rounded-lg border border-white/10">
              <span className="font-semibold text-gray-200">Skills:</span>
              <span className="text-gray-100">{user.skills}</span>
            </li>
            <li className="flex justify-between items-center bg-white/5 p-4 rounded-lg border border-white/10">
              <span className="font-semibold text-gray-200">Available Leaves:</span>
              <span className="text-green-400 font-bold">{user.Available_leaves}</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
