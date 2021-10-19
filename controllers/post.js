const Post = require('../models/post');
const fs = require('fs');
const {
    secureHeapUsed
} = require('crypto');

// const {
//     Z_FIXED
// } = require('zlib');

exports.getAllPosts = (req, res, next) => {
    Post.findAll({
            attributes: {
                exclude: ['userUserId']
            }
        }).then((posts) => {
            res.status(200).json(posts);
        })
        .catch((error) => {
            res.status(400).json({
                error: error
            })
        })
}

exports.getOnePost = (req, res, next) => {
    Post.findOne({
        where: {
            postId: req.params.id
        },
        attributes: {
            exclude: ['userUserId']
        }
    }).then((post) => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                status: 'The post could not be found.'
            })
        }
    }).catch((error) => {
        res.status(500).json({
            error: 'Error: ' + error
        })
    })
}

exports.createAPost = (req, res, next) => {
    const postObject = req.body;
    const post = Post.create({
        userId: res.locals.userId,
        postTitle: postObject.postTitle,
        postContent: postObject.postContent,
        media: postObject.media
    }).then((post) => {
        res.status(201).json({
            success: 'Post has been successfully created!',
            post
        });
    }).catch((error) => {
        res.status(404).json({
            error: error
        })
    })
};

exports.editPost = (req, res, next) => {
    const postObject = req.body
    Post.findOne({
        where: {
            postId: postObject.postId,
            userId: res.locals.userId,
        },
        attributes: {
            exclude: ['userUserId']
        }
    }).then((post) => {
        if (post) {
            post.update({
                postTitle: postObject.postTitle,
                postContent: postObject.postContent,
                media: postObject.media
            }).then(() => {
                res.status(200).json({
                    success: 'Post has been updated successfully!'
                })
            }).catch(err => {
                res.send(err)
            })
        } else {
            res.status(401).json({
                error: 'You cannot access this post'
            });
        }
    }).catch(err => {
        res.send('error: ' + err)
    })
}

exports.deletePost = (req, res, next) => {
    Post.destroy({
        where: {
            postId: req.params.id,
            userId: res.locals.userId
        }
    }).then((post) => {
        if (post) {
            res.status(200).json({
                success: 'The post has been successfully deleted.'
            })
        } else {
            res.status(401).json({
                error: 'You cannot access this post.'
            });
        }
    }).catch((error) => {
        res.status(500).json({
            error: error
        })
    })
}
