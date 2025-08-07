const { log } = require('console');
const express = require('express');
const path = require("path");
const userRoute = require('./routes/user')
const mongoose = require('mongoose');



const app = express();

// middleware to handle the req.body data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine',"ejs");
app.set("views",path.resolve("./views"));

app.get('/',(req,res)=>{
    res.render("home");
});
app.use('/user',userRoute);



mongoose.connect('mongodb://127.0.0.1:27017/blogify').then((e)=>{console.log("mongoDB connected");
})
const port = 8000;
app.listen(port,()=>{
    console.log("server is running on http://localhost:"+port);
})