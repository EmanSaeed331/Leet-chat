const socket = io()
/* - on accepts two things :
       1) the name of the event 
       2) the function to run when event occurs
*/
/* socket.on('countUpdated' , (count) =>{
    console.log('countUpdated' , count)
})
document.querySelector('#increament').addEventListener('click', ()=>{
    console.log('Clicked')
    socket.emit('increament')
})
 */
socket.on('message',(message)=>{
    console.log(message)
})
document.querySelector('#message-form').addEventListener(
    'submit',(e) =>{
        // (e.preventDefault()) --> to prevent default behavior  
        e.preventDefault()
       // const message = document.querySelector('input').value
       const message = e.target.elements.message.value
       socket.emit('sendMessage',message)
    })