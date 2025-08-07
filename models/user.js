const {Schema,model} = require("mongoose");
const { createHmac ,randomBytes} = require('node:crypto');
// const { use } = require("react");
const userSchema = new Schema({
    fullName:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required : true,
        unique : true
    },
    salt:{
        type:String,
        // required:true,
    },
    password:{
        type:String,
        required:true,

    },
    profileImageURL:{
        type:String,
        default:"./public/images/profile.png" 
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER',
    }
   

},
 {timestamps:true,}
);



userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return next(); // Always call next

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");

    user.salt = salt;
    user.password = hashedPassword;

    next(); // 
});


const User = model('user',userSchema);

module.exports = User;

