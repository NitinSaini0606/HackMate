// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';

// function View() {
//     const navigate = useNavigate();
//     const username = localStorage.getItem("username");
//     const collegeName = localStorage.getItem("collegeName");
//     const cityName = localStorage.getItem("cityName");
//     const stream = localStorage.getItem("stream");
//     const spec = localStorage.getItem("spec");
//     const yearStudy = localStorage.getItem("yearStudy");

//     const handleLogout = () => {
      
//        navigate('/'); 
//     }

//     const [students , setStudents] = useState([]);

//     useEffect(()=> {
//       const fetchStudents =  async () => {
//         try {
//           const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/getAllEducation`, {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               "Authorization": `Bearer ${localStorage.getItem("token")}`
//             }
//           });
//           const data = await res.json();
//           setStudents(data);
          
//         } catch (error) {
//           console.error("Error fetching students:", error);
//         }
//       }

//       fetchStudents();
//     }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-8">
//       <div className="w-full flex justify-between items-center mb-8 relative">
//         <h1 className="text-3xl font-bold text-center w-full">Welcome to Dashboard</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300 absolute right-8"
//           style={{ top: '2rem' }}
//         >
//           Logout
//         </button>
//       </div>
//       <input
//         type="text"
//         placeholder="Search for your specs needed..."
//         className="mb-8 px-4 py-2 border border-gray-300 rounded w-1/2"
//       />

//       <h1 className='text-2xl font-bold mb-4'>All Registered Students</h1>
//       <div className="bg-white shadow-md rounded-lg p-8 w-1/2 flex flex-col items-center">


      

        


        
//         <div className="w-full flex justify-center mb-6">
//           <span className="text-4xl font-bold text-blue-700">{username}</span>
//         </div>



//         <div className="grid grid-cols-2 gap-8 w-full">
//           <div className="flex flex-col items-center bg-blue-50 rounded-lg p-6">
//             <span className="text-xl font-semibold mb-2">College Name</span>
//             <span className="text-2xl font-bold text-gray-800">{collegeName}</span>
//           </div>


//           <div className="flex flex-col items-center bg-green-50 rounded-lg p-6">
//             <span className="text-xl font-semibold mb-2">City Name</span>
//             <span className="text-2xl font-bold text-gray-800">{cityName}</span>
//           </div>


//           <div className="flex flex-col items-center bg-yellow-50 rounded-lg p-6">
//             <span className="text-xl font-semibold mb-2">Stream</span>
//             <span className="text-2xl font-bold text-gray-800">{stream}</span>
//           </div>


//           <div className="flex flex-col items-center bg-pink-50 rounded-lg p-6">
//             <span className="text-xl font-semibold mb-2">Specialization</span>
//             <span className="text-2xl font-bold text-gray-800">{spec}</span>
//           </div>
//         </div>


//         <div className="mt-8 flex flex-col items-center">
//           <span className="text-xl font-semibold mb-2">Year of Study</span>
//           <span className="text-3xl font-bold text-purple-700">{yearStudy}</span>
//         </div>


//       </div>
//     </div> 
//   )  
// }

// export default View


{/* <h2>Education Details</h2>
      <p><strong>Username:</strong> {username}</p>
      <p><strong>College Name:</strong> {collegeName}</p>
      <p><strong>City Name:</strong> {cityName}</p>
      <p><strong>Stream:</strong> {stream}</p>
      <p><strong>Specialization:</strong> {spec}</p>
      <p><strong>Year of Study:</strong> {yearStudy}</p>  */}

import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { BellPlus, MessageCircle, UserPlus } from 'lucide-react';



function View() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    navigate('/');
  };

  const [students, setStudents] = useState([]);
  const [searchTerm , setSearchTerm]  = useState('')

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/get-all-education`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}` 
          },
          credentials: "include" 
        });

        const data = await res.json();
        setStudents(data.data || []);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) => {
    return student.spec.toLowerCase().includes(searchTerm.toLowerCase()) 
  })



  const handleConnect = async (receiverId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/send-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ receiverId })
      });

      const data = await res.json();
      alert(data.message);
    }
    catch (error) {
      console.error("Error sending connection request:", error);
      alert("Error sending connection request");
    }
  }
  
     


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-4 sm:p-8">
   
      <div className="w-full flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 relative">
       
        <div className="flex items-center mb-2 sm:mb-0 sm:static sm:mr-auto">
          <button
            onClick={() => navigate('/notifications')}
            className="bg-white border border-blue-300 rounded-full p-2 shadow hover:bg-blue-50 transition duration-200"
            title="Incoming Messages"
          >
            <BellPlus size={24} className="text-blue-600" />
          </button>
        </div>
        
        <h1 className="text-lg sm:text-2xl font-bold text-center flex-1 mb-2 sm:mb-0">
          Welcome <span className='text-2xl text-blue-500'>{username}</span>
          
        </h1>
        
        <div className="flex items-center sm:ml-auto">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search for your specs needed..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        className="mb-6 sm:mb-8 px-3 py-2 border border-gray-300 rounded w-full sm:w-1/2"
      />

      <h1 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4">All Registered Students</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl">
        {filteredStudents.map((student) => (
          <div key={student._id} className="bg-white shadow-md rounded-lg p-4 sm:p-8 w-full flex flex-col items-center">
            <div className="w-full flex justify-center mb-4 sm:mb-6">
              <span className="text-lg sm:text-2xl lg:text-3xl font-bold text-blue-700">
                {student.userId?.firstName || "Unknown"}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 w-full">
              <div className="flex flex-col items-center bg-blue-50 rounded-lg p-3 sm:p-6">
                <span className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2">College Name</span>
                <span className="text-sm sm:text-base font-bold text-gray-800">{student.collegeName}</span>
              </div>
              <div className="flex flex-col items-center bg-green-50 rounded-lg p-3 sm:p-6">
                <span className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2">City Name</span>
                <span className="text-sm sm:text-base font-bold text-gray-800">{student.cityName}</span>
              </div>
              <div className="flex flex-col items-center bg-yellow-50 rounded-lg p-3 sm:p-6">
                <span className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2">Stream</span>
                <span className="text-sm sm:text-base font-bold text-gray-800">{student.stream}</span>
              </div>
              <div className="flex flex-col items-center bg-pink-50 rounded-lg p-3 sm:p-6">
                <span className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2">Specialization</span>
                <span className="text-xs sm:text-sm font-bold text-gray-800 break-words">{student.spec}</span>
              </div>
            </div>
            <div className="mt-6 sm:mt-8 flex flex-col items-center">
              <span className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2">Year of Study</span>
              <span className="text-sm sm:text-base font-bold text-purple-700">{student.yearStudy}</span>
            </div>
            
            <div className='mt-4 flex items-center gap-8'>
              <button
                className="mt-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-400 text-white px-4 py-2 rounded transition duration-300"
                title="Connect"
                onClick={() => handleConnect(student.userId._id)}
              >
                <UserPlus size={20} />
              </button>


              <button
                className="mt-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-400 text-white px-4 py-2 rounded transition duration-300"
                title="Chat"
                onClick={() => navigate(`/chat/${student.userId._id}`)}
                
              >
                <MessageCircle size={20} />
              </button>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default View;
