import React, { useEffect, useState } from 'react'
import socket from '../Socket'


function ChatPage({currentUserId , chatWithUserId}) {
    const [message , setMessage] = useState('');
    const [messages , setMessages] = useState([]);

    // useEffect(() => {
    //     socket.connect();

    //     socket.emit('join' , currentUserId);

    //     socket.on('receive-message', (data) => {
    //         setMessages((prev) => [...prev, {from:data.from ,text:data.text}]);
    //     })

    //     return () => {
    //         socket.disconnect();
    //     }
    // },[currentUserId])

    useEffect(() => {
        socket.connect();

        const id = currentUserId || localStorage.getItem("userId");
        if (id) {
            socket.emit('register', id); // 👈 Must emit a valid userId
        } else {
            console.warn("No userId found for socket join.");
        }

        socket.on('receive-message', (data) => {
            setMessages((prev) => [...prev, { from: data.from, text: data.text }]);
        });

        return () => {
            socket.disconnect();
        };
}, [currentUserId]);

    // const sendMessage = () => {
        
    //     if(!message.trim()) return;   

    //     const id = currentUserId || localStorage.getItem("userId");

    //     socket.emit('send-message' , {
    //         to:chatWithUserId,
    //         // from:currentUserId,
    //         from: id, // 👈 Use the current userId
    //         text:message
    //     })
    //     // setMessages((prev) => [...prev, {from:currentUserId , text:message}]);
    //     setMessages((prev) => [...prev, {from: id, text:message}]);
    //     setMessage('');
    // }

    const sendMessage = () => {
    if (!message.trim()) return;

    const id = currentUserId || localStorage.getItem("userId");

    socket.emit("send-message", {
        senderId: id,
        receiverId: chatWithUserId,
        message: message
    });

    setMessages((prev) => [...prev, { from: id, text: message }]);
    setMessage('');
};

  return (
    <div className="p-4">
      <h2 className="font-bold text-xl mb-4">Chat with User</h2>

      <div className="h-64 overflow-y-scroll border p-2 mb-4 bg-white">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${
              msg.from === currentUserId ? 'bg-blue-100 ml-auto' : 'bg-gray-200 mr-auto'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border px-3 py-2 rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatPage
