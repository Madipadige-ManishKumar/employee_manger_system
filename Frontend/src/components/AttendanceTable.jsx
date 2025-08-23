// src/pages/AttendanceTable.jsx
import React, { useContext, useEffect } from "react";
import UserNavbar from "./UserNavbar";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

const AttendanceTable = ({ res, thrs }) => {
  const {user,setUser}= useContext(UserContext);
 useEffect(() => {
  
    const fetchLeave = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/attreport", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({"email":user.email}), // 👈 assuming you want to send logged-in user data
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok) {
          toast.success("Attendance data fetched successfully!");
        }
        
      } catch (err) {
        toast.info(user.email+" This user")
        toast.error(`Error1: ${err.message}`);
        console.log(`Error: ${err.message}`);
      }
    };

    fetchLeave();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <UserNavbar />

      <div className="max-w-6xl mx-auto mt-12 bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-white/30">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold text-white drop-shadow-lg">
            ⏱ Attendance Report
          </h2>
          <a
            href="/export"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold shadow hover:scale-105 transition"
          >
            📥 Export
          </a>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/30 text-white">
                <th className="p-3">Date</th>
                <th className="p-3">Login Time</th>
                <th className="p-3">Logout Time</th>
                <th className="p-3">Hours Worked (HH:MM:SS)</th>
                <th className="p-3">Total Hours {thrs}</th>
              </tr>
            </thead>
            <tbody>
              {res?.date?.map((date, index) => (
                <tr
                  key={index}
                  className="odd:bg-white/10 even:bg-white/20 hover:bg-white/30 transition"
                >
                  <td className="p-3 text-white">{date}</td>
                  <td className="p-3 text-green-200">{res.login[index]}</td>
                  <td className="p-3 text-red-200">{res.logout[index]}</td>
                  <td className="p-3 text-yellow-200">{res.hrs[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTable;
