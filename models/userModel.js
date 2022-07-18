const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "user must have a name"],
        unique: true,
    },
    password: {
        type: String,
        require: [true, "user must have a password"]
    }
})

module.exports = mongoose.model("User", userSchema)