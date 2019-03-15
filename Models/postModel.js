const mongoose = require('mongoose')

const { Schema } = mongoose

const Post = new Schema({
   title:String,
   date: Date,
   content: String,
   image:String
})

module.exports = mongoose.model('Post',Post)

