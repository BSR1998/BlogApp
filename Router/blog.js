const express = require("express")
const Blog = require("../Model/blog")
const Commnet = require("../Model/comment")
const multer  = require('multer')
const app = express.Router()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/upload")
    },
    filename: function (req, file, cb) {

      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage })

app.get("/",(req,res)=>{

    res.render("addblog",{
        user:req.user
    })
})

app.get("/:blogId",async(req,res)=>{


    const blogID = req.params.blogId
    const blog = await Blog.findById(blogID).populate("createdBy")
    const comments = await Commnet.find({blogId:blogID}).populate("createdBy")
    console.log("Comment s ",comments)

    res.render("blog",{
        blog,
        user : req.user,
        comments
    })
})

app.post("/addBlog", upload.single("coverImage") ,async(req,res)=>{

    const {title,disc} = req.body
    console.log("User creating ",req.user)
    const blogObj = await Blog.create({
        title,
        disc,
        createdBy:req.user._id,
        coverImage:`/upload/${req.file.filename}`
    })
    res.redirect("/")

})

module.exports = app