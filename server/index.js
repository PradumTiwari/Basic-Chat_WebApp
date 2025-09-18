const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

// 1) Create express app
const app = express();

// 2) Create http server (required by socket.io)
const server = http.createServer(app);

// 3) Create socket.io server
const io = new Server(server, {
  cors: { origin: "http://localhost:5173" } // allow React frontend
});

// 4) Handle new connections
io.on("connection", (socket) => {
  console.log("user connected:", socket.id);

  // listen for a message from client
  socket.on("chatMessage", (msg) => {
    // broadcast message to everyone (including sender)
    io.emit("chatMessage", { id: socket.id, msg, time: Date.now() });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
  });
});

// 5) Start server
server.listen(3000, () => console.log("Server running on http://localhost:3000"));
