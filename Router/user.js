const express = require("express")
const User = require("../Model/user")
const {genrateToken
} = require("../Service/config")
const app = express.Router()

app.get("/signin",(req,res)=>{
    res.render("signin")
})
app.get("/signup",(req,res)=>{
    res.render("signup")
})


app.post("/signin", async (req,res)=>{

    const {email,password} = req.body
    let {token,user} =  await User.checkUser(email,password)
    if(!token) return res.render("signin")
        res.cookie("uid",token).redirect("/")

})
app.post("/signup", async (req,res)=>{
    
    const {fullName,email,password} = req.body
    const userResult = await User.create({
        fullName,
        email,
        password
    })

   const uid = genrateToken(userResult)

    res.cookie("uid",uid).render("home",{
        user:userResult
    })

})

module.exports = app