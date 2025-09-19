// src/pages/adminatt.jsx
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AdminLayout from "./AdminLayout";
import { useLocation } from "react-router-dom"; 

const AdminAtt = () => {
  const location = useLocation();
  const { res, thrs } = location.state || { res: {}, thrs: 0 };
  useEffect(()=>{
    toast.info("Fetching attendance data...");

  },[])

  const handleExport = async () => {
    toast.info("Exporting to Excel...");
  };


  return (
    <AdminLayout>
    <div className="p-6">
      
      <table className="table-auto border-collapse border border-gray-300 w-auto text-left">
        <thead>
          <tr>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Login Time</th>
            <th className="border px-4 py-2">Logout Time</th>
            <th className="border px-4 py-2">Hours worked (HH:MM:SS)</th>
            <th className="border px-4 py-2">Total Hours: {thrs}</th>
            <th className="border px-4 py-2">
              <button
                onClick={handleExport}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Export
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {res?.date?.map((date, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{date}</td>
              <td className="border px-4 py-2">{res.login[index]}</td>
              <td className="border px-4 py-2">{res.logout[index]}</td>
              <td className="border px-4 py-2">{res.hrs[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </AdminLayout>
  );
};

export default AdminAtt;
