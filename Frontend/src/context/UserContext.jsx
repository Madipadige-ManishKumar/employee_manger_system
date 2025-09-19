import { Children, createContext } from "react";
import { useState,useEffect } from "react";
export const UserContext =createContext();

export const UserProvider =({children})=>{
    const [user, setUser] = useState({
    email: "",
    U_name: "",
    Designation: "",
    Department_Working: "",
    Reporting_Manager: "",
    skills: "",
    Available_leaves: "",
  });
 useEffect(() => {
    // 🔄 Load user from localStorage on app start/refresh
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
    return(
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}