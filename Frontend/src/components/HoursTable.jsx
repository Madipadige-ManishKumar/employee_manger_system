import React from "react";
import AdminLayout from "./AdminLayout";

const HoursTable = ({ usernames, hrs, sum }) => {
  return (
    <AdminLayout>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-400 w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">Username</th>
              <th className="border border-gray-400 px-4 py-2">No. of Hours Worked</th>
              <th className="border border-gray-400 px-4 py-2">
                Total Hours: {sum}
              </th>
            </tr>
          </thead>
          <tbody>
            {hrs.map((hour, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-400 px-4 py-2">
                  {usernames[index]}
                </td>
                <td className="border border-gray-400 px-4 py-2">{hour}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default HoursTable;
