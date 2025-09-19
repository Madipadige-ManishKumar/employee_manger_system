import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { toast } from "react-toastify";
import AdminAtt from "./AdminAtt";
import { useNavigate } from "react-router-dom";

const EmployeeReport = () => {
  const [users, setUsers] = useState([]);
  const [months, setMonths] = useState([]);
  const [formData, setFormData] = useState({
    emp: "",
    mode: "1",
    month: "",
  });
  const navigate = useNavigate();
    const [res, setRes] = useState({});
    const [thrs, setThrs] = useState(0);

  // Fetch users & months from Flask API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Endpoint must return: { users: [...], months: [...] }
        
        const res = await fetch("http://127.0.0.1:5000/emphrs");
        toast.info(res+"is the re")
        const data = await res.json();
        
        setUsers(data.users);
        setMonths(data.months);
        
        if (data.users.length > 0) {
          setFormData((prev) => ({ ...prev, emp: data.users[0].username }));
        }
        if (data.months.length > 0) {
          setFormData((prev) => ({ ...prev, month: data.months[0] }));
        }
      } catch (error) {
        console.error("Error fetching users/months:", error);
      }
    };
    fetchData();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:5000/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if(res.ok && data.success)
      {
          if(data.mode=="1"){
            navigate("/adminatt",{
              state:{
                res:data.res,
                thrs:data.thrs 
              }
            }
              
            );
          }
          else if(data.mode=="2"){
            navigate("/adminleave",{
              state:{
                res:data.res,
              }
            }
            );
          }
      }
      
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="max-w-3xl mx-auto bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-8 border">
          <h2 className="text-2xl font-bold mb-6 text-indigo-900">
            Employee Report
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Employee Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee
              </label>
              <select
                name="emp"
                value={formData.emp}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              >
                {users.map((user, idx) => (
                  <option key={idx} value={user.username}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>

            {/* Mode Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mode
              </label>
              <select
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              >
                <option value="1">Hours Worked</option>
                <option value="2">Leaves Took</option>
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

export default EmployeeReport;
