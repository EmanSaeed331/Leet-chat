const path =require('path')
const express = require('express')
const app = express()

const publicDirectoryPath = path.join(__dirname,'../public')
const port = process.env.PORT || 3000 

app.use (express.static(publicDirectoryPath))
app.listen(port , ()=>{
    console.log(`Server connected on port number ${port}`)
}) 