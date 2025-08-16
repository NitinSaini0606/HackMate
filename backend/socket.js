// socket.js
const { Server } = require("socket.io");

const users = new Map();

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // your frontend
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // register userId when frontend sends it
    socket.on("register", (userId) => {
      users.set(userId, socket.id);
      console.log(`User ${userId} joined with socket ID: ${socket.id}`);
    });

    // send message to specific user
    socket.on("send-message", ({ senderId, receiverId, message }) => {
      const receiverSocketId = users.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receive-message", {
          senderId,
          message,
        });
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      for (const [userId, id] of users.entries()) {
        if (id === socket.id) {
          users.delete(userId);
          break;
        }
      }
    });
  });

  return io;
}

module.exports = initSocket;
