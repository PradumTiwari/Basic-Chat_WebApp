var socket=io();

let btn=document.getElementById('btn');

let inputmsg=document.getElementById('newmsg');

let msgList=document.getElementById('msgList');
console.log(btn);

btn.onclick=()=>{
    socket.emit('msg_send',{
        msg:inputmsg.value
    })
}


socket.on('msg_recieved',(data)=>{
    let limsg=document.createElement('li');
    limsg.innerText=data.msg;
    msgList.appendChild(limsg);
})