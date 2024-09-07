const jwt = require("jsonwebtoken")
const secretKey = "$uper@123"

function genrateToken(user)
{
    let payload = {
        _id:user._id,
        fullName:user.fullName,
        email:user.email,
        profileImage : user.profileImage

    }

    const uid = jwt.sign(payload,secretKey)
    return uid;
}

function varifyToken(uid)
{
   const user =  jwt.verify(uid,secretKey) 

   return user
}

module.exports = {

    genrateToken,
    varifyToken

}