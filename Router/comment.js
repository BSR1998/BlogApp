const express = require("express")

const Commnet = require("../Model/comment")

const app = express.Router()

app.post("/:blogId" ,async(req,res)=>{

    const {content} = req.body

    const comment = await Commnet.create({
        content,
        createdBy : req.user._id,
        blogId : req.params.blogId
    })
  
    res.redirect(`/blog/${req.params.blogId}`)

})

module.exports = app