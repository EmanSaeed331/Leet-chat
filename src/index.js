const path =require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const console = require('console')
const Filter = require('bad-words')
const {generateMessage , generateLocationMessage} = require('./utils/messages')
const {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom} = require('./utils/users')
const app = express()
//new application http server 
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
  
   /* ## methods from server to clients :
        1- socket.emit --> this emits an event to specific client .
        2- io.emit     --> this emits an event to every connected client .
        3- socket.broadcast.emit --> this emits  an event to every connected client except this one . 
   */ 
    // setup room
     /*
        1- io.to.emit --> this emits an event to everybody in a specific room .
        2- socket.broadcast.to.emit --> this emits an event for every one except this one .
     */ 

   socket.on('join' , (options,callback)=>{
        const {error , user}=addUser({id:socket.id,...options })
        if (error){ 
             return callback(error)
        }
        socket.join(user.room)

        socket.emit('message',generateMessage('Admin','Welcome!'))
        socket.broadcast.to(user.room).emit('message',generateMessage('Admin',`${user.username} has joined!`))
        io.to(user.room).emit('roomData',{
            room:user.room,
            users:getUsersInRoom(user.room)

        })
        callback()
   })
   socket.on('sendMessage',(message , callback)=>{
       const user = getUser(socket.id)
       const filter = new Filter()
       if(filter.isProfane(message)){
           return callback('Profanity is not allowed!')
       }
        io.to(user.room).emit('message',generateMessage(user.username,message))
        callback()
   })
    socket.on('sendLocation' , (coords , callback)=>{
        const user = getUser(socket.id)
        io.to(user.room) .emit('locationMessage',generateLocationMessage(user.username,`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })  
   // disconnect is a built in Event 
   socket.on('disconnect' , ()=>{
       const user = removeUser(socket.id)
       if(user){
         io.to(user.room).emit('message',generateMessage('Admin',`${user.username} has left!`))
         io.to(user.room).emit('roomData', {
             room:user.room ,
             users:getUsersInRoom(user.room)
         })
       }
   })
})
server.listen(port , ()=>{
    console.log(`Server connected on port number ${port}`)
})