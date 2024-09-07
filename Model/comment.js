const mongoose = require("mongoose")


const mongooseSchema = new mongoose.Schema({
    content :{
        type:String,
        require : true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
  
    },
    blogId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "blogs"
    }
  

},{timestamps : true})

const commentModel = mongoose.model("comments",mongooseSchema)

module.exports = commentModel