const path =require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const console = require('console')

//new application http server 
const app = express()
const server = http.createServer(app)
const io = socketio(server)
 

const port = process.env.PORT || 3000 
const publicDirectoryPath = path.join(__dirname,'../public')

app.use (express.static(publicDirectoryPath))
//socket is an object that it contains information about that connection  
/*
    -- server (emit) -> client (receive) -countUpdated
    -- client (emit) -> server (receive) -increment 
*/ 
var message  = "Welcome"
io.on('connection',(socket)=>{
    console.log('New WebSocket connection ')
    // send an event from the server to be received  from the client.
    // the event take just one thing which is the name of the event . 
  /*   socket.emit('countUpdated',count)
    socket.on('increment', ()=>{
        count++
        /* (socket.emit) emits an event */ 
        // socket.emit('countUpdated' , count)
        /*(io.emit) emits the event to every single connection */
     //   io.emit('countUpdated' , count) 
   // }) 
   io.emit('message',message)
   socket.broadcast.emit('message','A new user has joined !' )
   socket.on('sendMessage',(message)=>{
        io.emit('message',message)
   })
    socket.on('sendLocation' , (coords)=>{
        io.emit('message',`https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    })
   // disconnect is a built in Event
   socket.on('disconnect' , ()=>{
       io.emit('message',' A user has left !')
   })
   console.log(message)
})


server.listen(port , ()=>{
    console.log(`Server connected on port number ${port}`)
})