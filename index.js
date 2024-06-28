const express=require('express');
const http=require('http');
const connect=require('./config/database-config')
const socketio=require('socket.io');
const app=express();
const server=http.createServer(app);
const io=socketio(server);
//Here we have created a server using http.createServer(app) and then we have passed this server to socketio to create a socket connection.

app.use('/',express.static(__dirname+'/public'))

io.on('connection', (socket) => {

    socket.on('join_room',(data)=>{
      console.log("Joining a room",data.roomid);
      socket.join(data.roomid);
    })

      socket.on('msg_send',(data)=>{
      console.log(data);

      // io.emit('msg_recieved',data);//This line is Basically emmit event to all the socket connection
      // socket.emit('msg_recieved',data);//This line is Basically emmit event to only that socket connection
      io.to(data.roomid).emit('msg_recieved',data);//This line is Basically emmit event to all the socket connection except the socket connection who is emitting the event
    })



  });

app.set('view engine','ejs');
app.get('/chat/:roomid',async (req,res)=>{
  res.render('index',{
    roomid:req.params.roomid
  });
})
server.listen(3000,async ()=>{
    console.log('Server is running on port 3000');
    await connect();
    console.log('MongoDb connected');
})