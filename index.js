require("dotenv").config();
const { log } = require('console');
const express = require('express');
const path = require("path");
const userRoute = require('./routes/user')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middleware/authentication');
const blogRoute = require('./routes/blog');
const app = express();



const Blog = require('./models/blog');
// middleware to handle the req.body data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
app.use(express.static(path.resolve('./public')));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine',"ejs");
app.set("views",path.resolve("./views"));

app.get('/',async (req,res)=>{
    const allBlogs = await Blog.find({}).sort({createdAt:-1});
    res.render("home",{
    user:req.user,

    blogs :allBlogs
    });
   
});
app.use('/user',userRoute);

app.use('/blog',blogRoute);

mongoose.connect(process.env.MONGO_URL).then((e)=>{console.log("mongoDB connected");
})
const port = process.env.PORT ;
app.listen(port,()=>{
    console.log("server is running on http://localhost:"+port);
})

