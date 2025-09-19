// src/pages/AdminLeave.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; 
import AdminLayout from "./AdminLayout";


const AdminLeave = () => {
    const location = useLocation();
    const { res } = location.state || { res: {} };

  return (
    <AdminLayout>
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Leave Records</h2>
      <table className="table-auto border-collapse border border-gray-300 w-full text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Reason</th>
          </tr>
        </thead>
        <tbody>
          {res?.date?.map((date, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{date}</td>
              <td className="border px-4 py-2">{res.reason[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </AdminLayout>
  );
};

export default AdminLeave;
