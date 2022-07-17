const Post = require("../models/postModel")

const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json({
            status: "success",
            results: posts.length,
            data: {
                posts
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
        });
    }
};

const getOnePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json({
            status: "success",
            data: {
                post
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
        });
    }
};

const createPost = async (req, res) => {
    try {
        const post = await Post.create(req.body)
        res.status(200).json({
            status: "success",
            data: {
                post,
            }
        })
    } catch (error) {
        res.status(200).json({
            status: "failed",
        });
    }
};

const updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })
        res.status(200).json({
            status: "success",
            data: {
                post
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed"
        });
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "success",
        })
    } catch (error) {
        res.status(400).json({
            status: "failed"
        });
    }
}

module.exports = {
    getAllPost,
    getOnePost,
    createPost,
    updatePost,
    deletePost
}