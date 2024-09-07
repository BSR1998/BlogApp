
const express = require("express")
const {connectToDatabseFun} = require("./Connection")
const path = require("path")
const cookieParser = require("cookie-parser")
const {verifyUser} = require("./Middleware/authentication")
const userRouter = require("./Router/user")
const blogRouter = require("./Router/blog")
const commentRouter = require("./Router/comment")
const Blog = require("./Model/blog")
const app =  express()
const PORT =   8000;

// Connecting to server 
connectToDatabseFun("mongodb://localhost:27017/BlogApp")

// Middleware
app.use(express.static(path.resolve('./public')))
app.use(cookieParser())
app.use(verifyUser())
app.use(express.urlencoded({extended : false}))

// View Engine
app.set("view engine","ejs")
app.set("views","./Views")

// Routers setting
app.use("/user",userRouter)
app.use("/blog",blogRouter)
app.use("/comment",commentRouter)


// Home Page router
app.get("/",async (req,res)=>{
    const blogs = await Blog.find({})
    res.render("home",{
        user:req.user,
        blogs
    })
    console.log("Blogs Data ",blogs.createdBy)
})

app.get("/logout",(req,res)=>{
    res.clearCookie("uid").render("signin")
})

app.listen(PORT,console.log(`Connected to server at ${PORT}`))