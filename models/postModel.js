const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "post must have a title"]
    },
    body: {
        type: String,
        require: [true, "body cannot be empty"]
    }
})

const Post = mongoose.model("Post", postSchema)
module.exports = Post