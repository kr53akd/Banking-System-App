const express = require('express');
const app = express();
const port = 2000;
const path = require("path");
require('dotenv').config();
require('./Database/conn');
app.use(express.json());
app.use(require('./route'));

// Static files
app.use(express.static(path.join(__dirname,'./client/build')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,"./client/build/index.html"))
})

app.listen(process.env.PORT || 2000,()=>{console.log(`server is running at port number ${port}`)})