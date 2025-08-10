const JWT = require('jsonwebtoken');
const { create } = require('../models/user');
require('dotenv').config();

const secret = process.env.JWT_SECRET;
// jwt_secret = "suyash@123";


function createTokenForUser(user){
    const payLoad={
        _id:user._id,
         email :user.email,
         profileImage :user.profileImage,
         role:user.role,
    };
const token = JWT.sign(payLoad,secret);
return token;
}

function validateToken(token){
    const payLoad = JWT.verify(token,secret);
    return payLoad;
}

module.exports={createTokenForUser,validateToken};

