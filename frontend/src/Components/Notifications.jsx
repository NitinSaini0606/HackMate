import React from 'react'
import { useEffect } from 'react'
import { use } from 'react'
import { useState } from 'react'

function Notifications() {
    const [sentRequest , setSentRequest] = useState([])
    const [receivedRequest , setReceivedRequest] = useState([])

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const token = localStorage.getItem('token');

                const [receivedRes , sentRes] = await Promise.all([
                    fetch(`${import.meta.env.VITE_API_URL}/auth/get-request` , {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    }),

                    fetch(`${import.meta.env.VITE_API_URL}/auth/sent-requests` , {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    })
                ])
                const receivedData = await receivedRes.json();
                const sentData = await sentRes.json();

                setReceivedRequest(receivedData.data || []);
                setSentRequest(sentData.data || []);
            }
            catch (error) {
                console.error("Error fetching requests:", error);
            }
        }
        fetchRequests();
    },[])


    const handleAccept = async (id) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/accept-request/${id}` , {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if(res.ok) window.location.reload();
    }

    const handleReject = async(id) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/reject-request/${id}` , {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if(res.ok) window.location.reload();
    }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">🔔 Notifications</h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">📥 Incoming Requests</h3>
        {receivedRequest.length === 0 ? (
          <p>No incoming requests</p>
        ) : (
          receivedRequest.map((req) => (
            <div key={req._id} className="bg-white p-4 rounded shadow mb-2">
              <p>
                <strong>{req.sender.firstName}</strong> ({req.sender.email}) sent you a request
              </p>
              <div className="mt-2 space-x-2">
                <button onClick={() => handleAccept(req._id)} className="bg-green-500 text-white px-3 py-1 rounded">
                  Accept
                </button>
                <button onClick={() => handleReject(req._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">📤 Sent Requests</h3>
        {sentRequest.length === 0 ? (
          <p>No sent requests</p>
        ) : (
          sentRequest.map((req) => (
            <div key={req._id} className="bg-white p-4 rounded shadow mb-2">
              <p>
                You sent a request to <strong>{req.receiver.firstName}</strong> ({req.receiver.email}) - 
                <span className={`ml-2 font-semibold ${req.status === 'accepted' ? 'text-green-600' : req.status === 'declined' ? 'text-red-600' : 'text-yellow-500'}`}>
                  {req.status}
                </span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Notifications
