const User = require("../models/userModel")
const bcrypt = require('bcryptjs')

const signUp = async (req, res) => {
    const { username, password } = req.body
    try {
        const hashpassword = await bcrypt.hash(password, 12)
        const newUser = await User.create({
            username,
            password: hashpassword,
        })
        req.session.user = newUser
        res.status(201).json({
            status: "successs",
            data: {
                user: newUser,
            }
        })
    } catch (error) {

        res.status(400).json({
            status: 'failed'
        })
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username })
        if (!user) {
            res.status(404).json({
                status: "failed",
                message: "user not found"
            })
        }

        const isCorrect = await bcrypt.compare(password, user.password)
        if (isCorrect) {
            req.session.user = user
            res.status(200).json({
                status: "success"
            })
        } else {
            res.status(400).json({
                status: "failed",
                message: "incorrect password"
            })
        }

    } catch (error) {
        res.status(400).json({
            status: "fail",
        })
    }
}

module.exports =
{
    signUp,
    login
}