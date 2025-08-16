import React, { useState , useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';



function Dashboard() {

  const Navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [formData , setFormData] = useState({
    collegeName: '',
    cityName: '',
    stream: '',
    spec: '',
    yearStudy: ''
  })

  //   useEffect(() => {
  //   const fetchEducation = async () => {
  //     try {
  //       const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/education`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         credentials: "include", // You are using cookie-based auth
  //       });

  //       if (res.ok) {
  //         const data = await res.json();
  //         if (data) {
  //           setFormData({
  //             collegeName: data.collegeName || '',
  //             cityName: data.cityName || '',
  //             stream: data.stream || '',
  //             spec: data.spec || '',
  //             yearStudy: data.yearStudy || ''
  //           });
  //         }
  //       } else {
  //         console.log("No existing education data found.");
  //       }
  //     } catch (err) {
  //       console.error("Error fetching education data:", err);
  //     }
  //   };

  //   fetchEducation();
  // }, []);

  useEffect(() => {
  const checkIfAlreadyFilled = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/get-my-education`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const result = await res.json();

      if (result.filled) {
        // Save data to localStorage (used in View.jsx)
        localStorage.setItem("collegeName", result.data.collegeName);
        localStorage.setItem("cityName", result.data.cityName);
        localStorage.setItem("stream", result.data.stream);
        localStorage.setItem("spec", result.data.spec);
        localStorage.setItem("yearStudy", result.data.yearStudy);

        // 🔁 Redirect to view page
        Navigate("/view");
      }
    } catch (err) {
      console.error("Error checking user education:", err);
    }
  };

  checkIfAlreadyFilled();
}, []);



  const handleChange = (e) => {
        setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
        }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit button clicked");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/education`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Submission failed");
      }

      const data = await res.json();
      console.log("Submission successful", data);
      localStorage.setItem("collegeName", formData.collegeName);
      localStorage.setItem("cityName", formData.cityName);
      localStorage.setItem("stream", formData.stream);
      localStorage.setItem("spec", formData.spec);
      localStorage.setItem("yearStudy", formData.yearStudy);
      console.log("Education details saved successfully");

      Navigate("/view"); 
    }

    catch (err) {
      console.error("Error occurred while saving education details:", err);
      alert("Failed to save education details");
    }

    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0e7ff] via-[#ffe7e7] to-[#e7faff] p-4 relative">
      <div className="flex justify-between items-start w-full">
        <h1
          className="text-2xl sm:text-3xl font-bold text-[#5a189a] mt-4 ml-6 transition-all duration-300 hover:text-[#0077b6] cursor-pointer drop-shadow"
          style={{ letterSpacing: '1px' }}
        >
          Welcome, {username}
        </h1>

        <button
          className="mt-4 mr-6 bg-gradient-to-r from-[#ff6f61] via-[#f9c846] to-[#43bccd] hover:from-[#43bccd] hover:to-[#ff6f61] text-white px-5 py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 font-semibold"
          onClick={() => {
            localStorage.removeItem("username");
            Navigate("/");
          }}
        >
          Logout
        </button>
      </div>

      <form 
      className="max-w-md mx-auto mt-12 bg-white p-8 rounded-lg shadow-md space-y-6"
      onSubmit={handleSubmit}
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-[#5a189a] mb-6 text-center tracking-wide drop-shadow">
          Fill in Your Details
        </h2>
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="collegeName">
            College Name
          </label>
          <input
            type="text"
            id="collegeName"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a189a]"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="cityName">
            City Name
          </label>
          <input
            type="text"
            id="cityName"
            name="cityName"
            value={formData.cityName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a189a]"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="stream">
            Stream
          </label>
          <input
            type="text"
            id="stream"
            name="stream"
            value={formData.stream}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a189a]"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="spec">
            Specialization
          </label>
          <input
            type="text"
            id="spec"
            name="spec"
            value={formData.spec}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a189a]"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="yearStudy">
            Year of Study
          </label>
          <input
            type="text"
            id="yearStudy"
            name="yearStudy"
            value={formData.yearStudy}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#5a189a]"
            required
          />
        </div>
        <button
          // to="/view"
          type="submit"
          className="w-full bg-gradient-to-r from-[#5a189a] to-[#43bccd] text-white font-bold py-2 px-4 rounded hover:from-[#43bccd] hover:to-[#5a189a] transition-all duration-300"
          // onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Dashboard
