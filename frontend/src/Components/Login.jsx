import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import socket from '../Socket';

export default function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
        }));
    };

    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     console.log("login button clicked");

    //     try {
    //         const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         credentials: "include",
    //         body: JSON.stringify(formData),
    //         });

    //         if (!res.ok) {
    //             const errorData = await res.json();
    //             throw new Error(errorData.message || "Login failed");
    //         }

    //         const data = await res.json();
    //         console.log("Login successful", data);

    //         localStorage.setItem("username", data.user?.firstName || "User");
    //         const token = data.token;
    //         navigate("/dashboard"); 
    //     } 
    //     catch (err) {
    //         console.error("Login failed", err.message);
    //     }
    // };

    const handleLogin = async (e) => {
  e.preventDefault();
  console.log("login button clicked");

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await res.json();
    console.log("Login successful", data);
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.user?.firstName || "User");
    localStorage.setItem("userId", data.user._id); 
    socket.connect();
    socket.emit("register", data.user._id);

    


    const eduRes = await fetch(`${import.meta.env.VITE_API_URL}/auth/get-my-education`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const eduData = await eduRes.json();

    if (eduData.filled) {
 
      localStorage.setItem("collegeName", eduData.data.collegeName);
      localStorage.setItem("cityName", eduData.data.cityName);
      localStorage.setItem("stream", eduData.data.stream);
      localStorage.setItem("spec", eduData.data.spec);
      localStorage.setItem("yearStudy", eduData.data.yearStudy);

    
      navigate("/view");
    } else {
 
      navigate("/dashboard");
    }

  } catch (err) {
    console.error("Login failed", err.message);
  }
};


    






  return (
    <div className="min-h-screen bg-[#f8f2e9] flex items-center justify-center p-4">
      <div className="bg-[#fff8e7] shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-[#5c6a4f] text-center mb-6">HackMate Login</h1>
        <form 
        className="space-y-4"
        onSubmit={handleLogin}
        >
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d9822b]"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d9822b]"
          />
          <button
            type="button"
            className="w-full bg-[#5c6a4f] hover:bg-[#4a563e] text-white p-3 rounded-lg transition duration-300"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>

        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-700">
            Don't have an account?{' '}
            <Link
              to="/"
              className="text-[#d9822b] font-semibold hover:underline"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}