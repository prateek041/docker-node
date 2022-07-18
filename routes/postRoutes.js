const express = require('express')
const protect = require('../middleware/authMiddleware')
const {
    getAllPost,
    getOnePost,
    createPost,
    updatePost,
    deletePost
} = require("../controllers/postControllers")

const router = express.Router()

router.route("/").get(protect, getAllPost).post(protect, createPost)

router.route("/:id").get(protect, getOnePost).patch(protect, updatePost).delete(protect, deletePost)

module.exports = router