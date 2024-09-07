const {varifyToken} = require("../Service/config")


function verifyUser()
{
    return (req,res,next)=>{

        req.user = null
        
        const uidValue = req.cookies?.uid

        if(!uidValue)
        {
            if(req.url === "/user/signin" || req.url === "/user/signup") 
                return next()
            else  {
                return res.render("signin")
               }
        
        }

        try{

           const user = varifyToken(uidValue)
            
           req.user = user

        }
        catch(err)
        {
       
        }
        return next();

    }
}

module.exports = {
    verifyUser
}