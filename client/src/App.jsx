import {useEffect,useState,useRef} from 'react';
import { io } from "socket.io-client";

const App = () => {


  const socketRef=useRef(null);
  const [messages,setMessages]=useState([]);
  const [text,setText]=useState("");
  useEffect(()=>{
    socketRef.current=io("http://localhost:3000");

    //2.listen for messages from server

    socketRef.current.emit("setUsername",prompt("Enter your username"));
    socketRef.current.on("chatMessage",(data)=>{
      setMessages((prev)=>[...prev,data]);
    });

     socketRef.current.on("userJoined", (msg) => {
    setMessages((prev) => [...prev, { system: true, msg }]);
  });

  socketRef.current.on("userLeft", (msg) => {
    setMessages((prev) => [...prev, { system: true, msg }]);
  });

    

    return()=>{
      socketRef.current.disconnect();
    }
  },[]);

  function send(){
    if(!text)return;
    socketRef.current.emit("chatMessage",text);
    setText("");
  }
   return (
    <div>
      <h2>Chat</h2>
      <ul>
  {messages.map((m, i) => (
    <li key={i}>
      {m.system 
        ? <i>{m.msg}</i>  // italic for system messages
        : <b>{m.user}:</b> } {m.msg}
    </li>
  ))}
</ul>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
}
export default App