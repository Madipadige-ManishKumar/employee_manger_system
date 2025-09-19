import React from "react";
import AdminLayout from "./AdminLayout";
import { useLocation } from "react-router-dom";

const DeptHoursReport = () => {
  // data will be passed via navigate or props
  // Expected format:
  // {
  //   usernames: ["Alice", "Bob", "Charlie"],
  //   hrs: [40, 35, 45],
  //   sum: 120
  // }
  const location = useLocation()
  const {data} = location.state||{data:{}}


  return (
    
    <AdminLayout>
      <div className="p-6 flex justify-center">
        <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-8 border w-[900px]">
          <h2 className="text-2xl font-bold mb-6 text-indigo-900">
            Department Hours Report
          </h2>

          <table className="min-w-full divide-y divide-gray-200 border shadow-md rounded-lg overflow-hidden">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold tracking-wider">
                  No. of Hours Worked
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold tracking-wider">
                  Total Hours: {data?.sum}
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {data?.usernames?.map((username, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {username}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {data.hrs[index]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DeptHoursReport;
