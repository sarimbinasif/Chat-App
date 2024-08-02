const exp = require("constants")
const express = require("express")

const app=express()

const http = require("http").createServer(app)



const PORT = process.env.PORT || 3000


http.listen(PORT, ()=>{
    console.log(`Listening on PORT ${PORT}`)
})

app.use(express.static(__dirname + "/public"))

app.get("/", (req,res)=>{
    // return res.send("Hello World")
    res.sendFile(__dirname + "/index.html")
})

// socket: server setup

const { createServer } = require('node:http');
// const { join } = require('node:path');
const { Server } = require('socket.io');

const io = new Server(http);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);
  socket.on("message", (msg)=>{
    // console.log(msg)

    //send msg back to alll clients except own
    socket.broadcast.emit("message", msg)
  })
});

