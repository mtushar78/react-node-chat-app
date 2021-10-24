const express = require('express');
const app = express();
const Socket = require('socket.io');
const http = require('http');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);
const io = Socket(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
});
io.on("connection", (socket)=>{
    socket.on('joined_room', (data)=>{
        socket.join(data);
        console.log(`user with id ${socket.id} has joined room ${data}`);
    });
    socket.on("send_msg",data=>{
        console.log(data);
        socket.to(data.room).emit("receive_msg", data);
    })
    socket.on("disconnect",()=>{
        console.log("disconnected:" +socket.id);
    });
});


server.listen(3001,()=>{
    console.log('SERVER IS RUNNING');
})
