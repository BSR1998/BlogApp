const mongoose = require("mongoose")
const { createHmac,randomBytes } = require('crypto');
const { genrateToken} = require("../Service/config")

const userSchema = new mongoose.Schema({
    fullName :{
        type:String,
        require : true
    },
    email:{
        type: String,
        require : true,
        unique : true
    },
    password :{
        type:String,
        require: true
    },

    profileImage :{
        type : String,
        default : "/userImage/user.png"
    },
    salt :{
        type : String,
    }

})

userSchema.pre('save', function(next) {

    console.log("Pre saved")

    const user = this;
    
    if(!user.isModified("password")) return

    const hashSalt  = randomBytes(16).toString();

    const hash = createHmac('sha256', hashSalt)
               .update(user.password)
               .digest('hex');

    this.password = hash
    this.salt = hashSalt

 return next()

},{timeStamps:true});

userSchema.static("checkUser", async function(email,password){
  
    const user = await this.findOne({email}) 

    if(!user) return false;

    const hashPassword = createHmac('sha256', user.salt)
               .update(password)
               .digest('hex');

    if(hashPassword !== user.password) throw new Error('Credentials are wrong');

     const token = genrateToken(user)

     return {token,user}
})

const userModle = mongoose.model("users",userSchema)


module.exports = userModle