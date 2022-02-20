const socket = io()
/* - on accepts two things :
       1) the name of the event 
       2) the function to run when event occurs
*/
socket.on('countUpdated' , (count) =>{
    console.log('countUpdated' , count)
})
document.querySelector('#increament').addEventListener('click', ()=>{
    console.log('Clicked')
    socket.emit('increament')
})
