import React, { useEffect } from "react";
import Typed from "typed.js";

import "./App.css"; // Ensure you have your styles imported
import { Link,Route,Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import UserNavbar from "./components/UserNavbar";
import ProfilePage from "./components/ProfilePage";
import ApplyLeaveForm from "./components/ApplyLeaveForm ";
import AttendanceTable from "./components/AttendanceTable";
import AddEmployee from "./components/AddEmployee";
import EmployeeReport from "./components/EmployeeReport";
import EmpEdit from "./components/EmpEdit";
import HoursTable from "./components/HoursTable";
import { ToastContainer } from "react-toastify";
import AdminAtt from "./components/AdminAtt";
import AdminLeave from "./components/AdminLeave ";
import DeptReport from "./components/DeptReport ";
import DeptHoursReport from "./components/DeptHoursReport ";
import Logout from "./components/Logout";


const App = () => {
  // Dummy attendece report 
   const res = {
    date: ["2025-08-01", "2025-08-02", "2025-08-03"],
    login: ["09:00:00", "09:15:00", "09:05:00"],
    logout: ["17:00:00", "17:10:00", "17:20:00"],
    hrs: ["08:00:00", "07:55:00", "08:15:00"],
  };
  const thrs = "24:10:00"; // Total hours worked in the month
 return(
  <>
  

    
  
     <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route
      path="/emp"
      element={
        <ProfilePage
          U_name="Manish Kumar"
          Designation="Software Engineer"
          Department_Working="Development"
          Reporting_Manager="Mr. Sharma"
          skills="React, Node.js, MongoDB"
          Avaiable_leaves="12"
        />
  }
/>
  <Route
        path="/apply"
        element={
          <ApplyLeaveForm
            leaves="10"
            value="5"
            rm="Mr. Sharma"
            msg="Leave application submitted successfully!"
          />

          
        }
  />
<Route path="/attreport" element={<AttendanceTable res={res} thrs={thrs} />} />
<Route path="/adduser" element={<AddEmployee />} />
<Route path ="/emphrs" element={<EmployeeReport/> }/>

<Route
  path="/empdet"
  element={
    <EmpEdit
      users={[
        { username: "Alice" },
        { username: "Bob" },
        { username: "Charlie" },
      ]}
    />
    
  }
/>



<Route 
path ="/adminatt"
element={<AdminAtt res={res} thrs={thrs} /> }
/>


<Route 
path ="/adminleave"
element={<AdminLeave  /> }
/>

<Route
path="/depthrs"
element={<DeptReport/>}
/>

<Route
path="/depthrsub"
element={<DeptHoursReport/>}
/>

<Route
path="/logout"
element={<Logout/>}
/>

    </Routes> 
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"/>
      


    
  </>
 )
};

export default App;
