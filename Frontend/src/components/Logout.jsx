import React, { useContext, useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";
import { UserContext } from "../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";


const Logout = () => {
    const {user,setUser} = useContext(UserContext)
    const [loader,setLoader] =useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        setLoader(true);
        const sendData =  async()=>{
    try{
        const res = await fetch("http://127.0.0.1:5000/Logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({'user':user}),
        
      });
      if (res.ok)
      {
        setUser(null);
          localStorage.clear();
        
        setTimeout(() => {
            setLoader(false);
            navigate("/");
          }, 2000);
      }

    }
    catch(err)
    {
        console.log(err)
    }

    }
    sendData()
    },[])
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <PacmanLoader color="#4f46e5" size={50} loading={loader} />
      
    </div>
  );
};

export default Logout;
