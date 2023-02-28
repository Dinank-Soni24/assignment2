const posts = require('../models/post');
const mongoose = require('mongoose');

//get all the blog posts ordered by latest first
exports.public_post = (req, res) => {
    posts.find().sort({publishedDate: -1})
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            Posts: docs
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

//Get details of selected blog
exports.public_selected_post = (req, res) => {
    posts.findById(req.params.postsId)
    .then( docs => {
        if(!docs){
            return res.status(404).json({
                message: 'post is not found'
            })
        }
        res.status(200).json({
            Post: docs
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
}

// Search for a specific blog - search by name 
exports.public_post_name = (req, res) => {
    posts.find({
        title: req.body.title,
    })
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            Posts: docs
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

// Search for a specific blog - search by content
exports.public_post_content = (req, res) => {
    const regex = new RegExp(req.body.contentKey, 'i');
    posts.find({
        content: { $regex: regex },
    })
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            Posts: docs
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

// filter specific blog post
exports.public_post_category = (req, res) => {
    posts.find({
        categoryId: req.body.categoryId,
    })
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            Post: docs
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

