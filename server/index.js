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

  //Listen for username
  socket.on("setUsername",(username)=>{
    socket.username=username;// only this line is required to set username
    console.log(`${username} joined with id ${socket.id}`);
    io.emit("userJoined", `${username} has joined the chat`);
  })

  // listen for a message from client
  socket.on("chatMessage", (msg) => {
    // broadcast message to everyone (including sender)
    io.emit("chatMessage", { id: socket.id,user:socket.username||"Anonymous", msg, time: Date.now() });
  });

  socket.on("disconnect", () => {
       console.log(`${socket.username || "A user"} disconnected`);
   io.emit("userLeft", `${socket.username || "A user"} left`);
  });
});

// 5) Start server
server.listen(3000, () => console.log("Server running on http://localhost:3000"));
