const mongoose = require("mongoose")


const blogSchema = new mongoose.Schema({
    coverImage :{
        type:String,
        require : true
    },
    title:{
        type: String,
        require : true,
  
    },
    disc :{
        type:String,
        require: true
    },

    createdBy :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'

    }

},{timestamps : true})

const blogModel = mongoose.model("blogs",blogSchema)

module.exports = blogModel