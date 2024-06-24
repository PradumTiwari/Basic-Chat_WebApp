var socket=io();

var button=document.getElementById('btn');

button.addEventListener('onClick',()=>{
    socket.emit('From_Client');
})

socket.on('From_Server',()=>{
    console.log("Collected a new Event from server");
    const div=document.createElement('h4');
    div.innerHTML="New Event from Server";
    console.log(div);
    document.body.appendChild(div);
})