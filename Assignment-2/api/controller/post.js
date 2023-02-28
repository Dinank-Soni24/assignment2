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
                createdBy: req.body.createdBy,
                // slug: req.body.slug
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
exports.post_get_all = (req, res) => {
    posts.find()
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

//get one post
exports.post_get_one = (req, res) => {
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

//update posts
exports.post_update = (req, res) => {
    const id = req.params.postsId;

    posts.updateMany({_id: id}, {$set: req.body})
    .then(result => {
        res.status(200).json({
            message: 'posts updated'
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

//delete posts
exports.post_delete = (req, res) => {
    const id = req.params.postsId;
    posts.findById(req.body.postsId)
    .then( Posts => {
        if(!Posts) {
            return res.status(404).json({
                message: 'Post is not found'
            })
        }
        return posts.remove({_id: id})
    })
    
    .then(result => {
        res.status(200).json({
            message: 'post is deleted'
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });

}