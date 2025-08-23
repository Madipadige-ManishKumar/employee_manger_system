import { SlArrowLeftCircle } from "react-icons/sl";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // 👈 import context

const Login = () => {
  const navigate = useNavigate();
  const { user,setUser } = useContext(UserContext); // 👈 get setter

  const [loading, setLoading] = React.useState(false);
  const [userdata, setUserdata] = React.useState({
    email: "",
    password: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.info("Logging in...");
    try {
      const res = await fetch("http://127.0.0.1:5000/loginauth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userdata),
      });

      const data = await res.json();
      toast.success("Welcome back, " + data.success + "!");
      if (res.ok && data.success) {
        toast.success("Login successful ✅");

        if(data.role==="admin")
        {
          navigate("/adduser");
          return;
        }
        else{
          
        // 👇 set context here instead of navigate state
        const userData = {
            email: data.email,
            U_name: data.U_name,
            Designation: data.Designation,
            Department_Working: data.Department_Working,
            Reporting_Manager: data.Reporting_Manager,
            skills: data.skills,
            Available_leaves: data.Available_leaves,
          };

          // 👇 update context
          setUser(userData);

          // 👇 store directly from data, not user state
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("authToken", data.token);


                navigate("/emp");
         } // no need to pass state anymore
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-lg w-full max-w-md">
        <SlArrowLeftCircle
          className="text-2xl cursor-pointer mb-4"
          onClick={() => navigate("/")}
        />
        <h2 className="text-3xl font-bold mb-6 text-center text-cyan-400">
          Login
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
          <input
            type="text"
            placeholder="Email"
            className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            value={userdata.email}
            required
            onChange={(e) =>
              setUserdata({ ...userdata, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={userdata.password}
            onChange={(e) =>
              setUserdata({ ...userdata, password: e.target.value })
            }
            className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-lg shadow-md transition"
          >
            {loading ? <ClipLoader size={20} color="#000" /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
