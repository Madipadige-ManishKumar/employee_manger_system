// src/pages/ApplyLeaveForm.jsx
import React, { useContext } from "react";
import UserNavbar from "./UserNavbar";
import { UserContext } from "../context/UserContext";

const ApplyLeaveForm = ({ leaves, value, rm, msg }) => {
  const { user,setUser } = useContext(UserContext);
  const [userdata, setUserdata] = React.useState({
    email: user.email,
    dl:"",
    dl1:"",
    reason:"",
  });
  const handlesubmit =async (e) => {
    e.preventDefault();
     try {
    const res = await fetch("http://127.0.0.1:5000/submitleave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
      credentials: "include", 
    });
    const data = await res.json();
    if(res.ok&&data.success)
    {
        setUser({...user,Available_leaves:data.available_leaves});
        localStorage.setItem(
        "user",
        JSON.stringify({ ...user, Available_leaves: data.available_leaves })
      );
        alert("Leave application submitted successfully!"+data.available_leaves);
    }
    

  }
  catch (err) {
    console.error(`Error: ${err.message}`);
  }
  };

  

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <UserNavbar />

      {/* Futuristic Gradient Background */}
      <span className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-800 opacity-90 blur-xl -z-10"></span>

      <div className="max-w-4xl mx-auto mt-20 bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl p-8 border border-white/20 hover:shadow-purple-500/50 transition">
        {/* Header */}
        <h2 className="text-2xl font-bold text-indigo-300 text-center mb-8">
          📝 Apply for Leave
        </h2>

        <form onSubmit={handlesubmit} method="post" className="space-y-8">
          {/* Available Leaves Section */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
              <p className="text-sm text-gray-200 font-medium">
                Available Leaves
              </p>
              <h3 className="text-2xl font-bold text-green-400">{user.Available_leaves}</h3>
            </div>

            <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
              <p className="text-sm text-gray-200 font-medium">Manager</p>
              <h3 className="text-lg font-semibold text-indigo-300">{user.Reporting_Manager}</h3>
            </div>
          </div>

          {/* Leave Dates */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-200 font-semibold mb-2">
                From Date
              </label>
              <input
                type="date"
                name="dl"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 outline-none"
                onChange={(e)=>setUserdata({...userdata,dl:e.target.value})}
              />
            </div>
            <div>
              <label className="block text-gray-200 font-semibold mb-2">
                To Date
              </label>
              <input
                type="date"
                name="dl1"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 outline-none"
                onChange={(e)=>setUserdata({...userdata,dl1:e.target.value})}
              />
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-gray-200 font-semibold mb-2">
              Reason
            </label>
            <textarea
              name="reason"
              rows="5"
              onChange={(e)=>setUserdata({...userdata,reason:e.target.value})}
              value={userdata.reason}
              placeholder="Write the reason for your leave..."
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400 outline-none"
            ></textarea>
          </div>

          {/* Submit button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 text-white font-bold shadow-lg hover:shadow-indigo-500/50 transition"
            >
              🚀 Submit Request
            </button>
          </div>

          {/* Message */}
          {msg && (
            <p className="text-center text-sm text-yellow-300 font-semibold mt-4">
              {msg}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ApplyLeaveForm;
