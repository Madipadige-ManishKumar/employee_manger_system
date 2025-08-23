import React, { useState } from "react";
import AdminLayout from "./AdminLayout"; // same folder

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    U_name: "",
    P_word: "",
    designation: "",
    Department: "GIS/CAD",
    Report: "",
    skills: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/signupauth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Employee added successfully ✅");
        setFormData({
          U_name: "",
          P_word: "",
          designation: "",
          Department: "GIS/CAD",
          Report: "",
          skills: "",
        });
      } else {
        alert("Failed to add employee ❌");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="max-w-2xl mx-auto bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-8 border">
          <h2 className="text-2xl font-bold mb-6 text-indigo-900">
            Add New Employee
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="U_name"
                value={formData.U_name}
                onChange={handleChange}
                placeholder="Enter username"
                className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="P_word"
                value={formData.P_word}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Designation */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="Enter designation"
                className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Department Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <select
                name="Department"
                value={formData.Department}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="GIS/CAD">GIS/CAD</option>
                <option value="Surveying">Surveying</option>
                <option value="Photogrammetry">Photogrammetry</option>
                <option value="LiDAR Services">LiDAR Services</option>
                <option value="Digital Twins">Digital Twins</option>
                <option value="BIM">BIM</option>
              </select>
            </div>

            {/* Reporting Manager */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Reporting Manager
              </label>
              <input
                type="text"
                name="Report"
                value={formData.Report}
                onChange={handleChange}
                placeholder="Enter reporting manager"
                className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Skills
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Enter skills"
                className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddEmployee;
