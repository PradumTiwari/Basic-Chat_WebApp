const mongoose=require('mongoose');

const chatSchema=new mongoose.Schema({
    content:{
        type:String,
    },
    user1:{
        type:String,
    },
    user2:{
        type:String,
    },
    roomid:{
        type:String,
        unique:true,
    }
})

const Chat=mongoose.model('chat',chatSchema);
module.exports=Chat;