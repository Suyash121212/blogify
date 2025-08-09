const {Router} = require('express');
const User = require("../models/user")
const router = Router();

router.get('/signin',(req,res)=>{
    res.render('signin');
})

router.get("/signup",(req,res)=>{
    res.render("signup");
});

router.post("/signin",async (req,res)=>{
    const {email,password} = req.body;
    console.log(email,password);
    
    const user = await User.matchPassword(email,password);
    console.log("user",user);
    
    console.log("user" ,user);
    return res.redirect("/");    
});


router.post("/signup", async (req, res) => {
     const { fullName, email, password } = req.body;
    console.log("Received form submission:", req.body);

    try {
        await User.create({
            fullName,
            email,
            password,
        });

        return res.redirect('/');  // ✅ redirect to home
    } catch (err) {
        console.error("Error creating user:", err);
        return res.status(500).send("Something went wrong");
    }
});

module.exports = router;
