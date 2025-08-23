import React, { useState } from "react";
import AdminLayout from "./AdminLayout";

const EmpEdit = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent full page reload
    console.log("Selected user:", selectedUser);

    // if you want to send to backend Flask:
    fetch("/empedit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emp: selectedUser }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Response:", data))
      .catch((err) => console.error(err));
  };

  return (
    <AdminLayout>
      <div className="w-[900px] h-[300px] bg-teal-200 border border-gray-400 rounded-md p-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center"
        >
          {/* Employee Dropdown */}
          <select
            name="emp"
            className="h-10 w-64 bg-blue-50 text-lg rounded-full px-4 mb-6"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Select Employee</option>
            {users.map((user, idx) => (
              <option key={idx} value={user.username}>
                {user.username}
              </option>
            ))}
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className="h-10 w-36 rounded-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};
export default EmpEdit;
