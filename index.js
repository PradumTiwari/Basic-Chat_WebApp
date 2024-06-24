const express=require('express');
const http=require('http');
const socketio=require('socket.io');
const app=express();
const server=http.createServer(app);
const io=socketio(server);
//Here we have created a server using http.createServer(app) and then we have passed this server to socketio to create a socket connection.

app.use('/',express.static(__dirname+'/public'))

io.on('connection', (socket) => {
    console.log('a user connected',socket.id);



    socket.on('From_Client',()=>{
      console.log("Event coming from client");
    })

   setInterval(()=>{
    socket.emit('From_Server');
   },2000);
  });


server.listen(3000,()=>{
    console.log('Server is running on port 3000');
})