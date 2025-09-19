import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { useNavigate } from "react-router-dom";

const DeptReport = () => {
  const [months, setMonths] = useState(["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]);
  const [formData, setFormData] = useState({
    dept: "GIS/CAD",
    month: "",
  });
  const navigate = useNavigate();

  // Fetch months from backend


  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:5000/depthrsub", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if(res.ok && data.success)
      {
        navigate('/depthrsub',{
            state:{
                data:data
            }
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 flex justify-center">
        <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-8 border w-[900px]">
          <h2 className="text-2xl font-bold mb-6 text-indigo-900">
            Department Report
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Department Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <select
                name="dept"
                value={formData.dept}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              >
                <option value="GIS/CAD">GIS/CAD</option>
                <option value="Surveying">Surveying</option>
                <option value="Photogrammetry">Photogrammetry</option>
                <option value="LiDAR Services">LiDAR Services</option>
                <option value="Digital Twins">Digital Twins</option>
                <option value="BIM">BIM</option>
                <option value="xyz">xyz</option>
              </select>
            </div>
            {/* Month Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Month
              </label>
              <select
                name="month"
                value={formData.month}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              >
                {months.map((m, idx) => (
                  <option key={idx} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DeptReport;
