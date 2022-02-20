const path =require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')

//new application http server 
const app = express()
const server = http.createServer(app)
const io = socketio(server)
 

const port = process.env.PORT || 3000 
const publicDirectoryPath = path.join(__dirname,'../public')

app.use (express.static(publicDirectoryPath))
let count = 0 
//socket is an object that it contains information about that connection  
/*
    -- server (emit) -> client (receive) -countUpdated
    -- client (emit) -> server (receive) -increment 
*/ 
io.on('connection',(socket)=>{
    console.log('New WebSocket connection ')
    // send an event from the server to be received  from the client.
    // the event take just one thing which is the name of the event . 
    socket.emit('countUpdated',count)
    socket.on('increament', ()=>{
        count++
        /* (socket.emit) emits an event */ 
        // socket.emit('countUpdated' , count)
        /*(io.emit) emits the event to every single connection */
        io.emit('countUpdated' , count)
    })
})


server.listen(port , ()=>{
    console.log(`Server connected on port number ${port}`)
})