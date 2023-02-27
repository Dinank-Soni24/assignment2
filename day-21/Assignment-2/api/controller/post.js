const posts = require('../models/post');
const category = require('../models/category');
const mongoose = require('mongoose');

// add the post
exports.post_create = (req, res) => {
    category.findById(req.body.categoryId)
        .then(Category => {
            if (!Category) {
                return res.status(404).json({
                    message: "category is not found"
                })
            }
            const Posts = new posts({
                _id: mongoose.Types.ObjectId(),
                categoryId: req.body.categoryId,
                title: req.body.title,
                content: req.body.content,
                publishedDate: req.body.publishedDate,
                createdBy: req.body.createdBy,
                slug: req.body.slug
            });
            return Posts.save()

        })
        .then(result => {
            res.status(201).json({
                message: 'Post is created Successfully'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

//get all post

// exports.post_get_all = 