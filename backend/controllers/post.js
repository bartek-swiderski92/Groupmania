const Post = require('../models/post');
const ReadPost = require('../models/readpost');
const db = require("../models/index.js");
const fs = require('fs');

const {
    secureHeapUsed
} = require('crypto');
const { post } = require('../routes/post');

// const {
//     Z_FIXED
// } = require('zlib');

exports.getAllPosts = (req, res, next) => {
    db.Post.findAll({
        include: [db.User, { model: db.Comment, include: db.User }, db.Like, db.ReadPost]
        //TODO: add user + comment
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
    db.Post.findOne({
        where: {
            id: req.params.id
        },
        include: [db.User, { model: db.Comment, include: db.User }, db.Like, db.ReadPost]
        // attributes: {
        //     exclude: ['userUserId']
        // }
    }).then((post) => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                status: 404,
                message: 'The post could not be found!'
            })
        }
    }).catch((error) => {
        res.status(500).json({
            error: 'Error: ' + error,
        })
    })
}

// exports.showAllUnreadPosts = (req, res, next) => {
//     // console.log(res)
//     db.Post.findAll({
//         // attributes: ['id'],
//         include: [{
//             model: [db.ReadPost, db.User],
//             required: false,
//             // right: true,
//             // attributes: ['id'],
//             where: {
//                 // UserId: res.locals.userId,
//                 PostId: !null
//             }
//         }],
//         where: {
//             // id: db.ReadPost.PostId
//             id: null

//         },
//         // required: false,
//         // right: true
//     })
//         .then(unReadPosts => {
//             res.status(200).json(unReadPosts)
//         }).catch(error => {
//             res.status(500).json({
//                 error: error + ''
//             })
//         })
// }

exports.createAPost = (req, res, next) => {
    console.log(req.body)
    const postObject = req.body;
    // const postObject = JSON.parse(req.body.post);
    const url = req.protocol + '://' + req.get('host')
    // console.log(req.body);
    const post = db.Post.create({
        UserId: res.locals.userId,
        postTitle: postObject.postTitle,
        postContent: postObject.postContent,
        // media: url + '/images/' + req.file.filename
        media: postObject.media
    }).then((post) => {
        res.status(201).json({
            message: 'Post has been created successfully!',
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
    db.Post.findOne({
        where: {
            id: req.params.id,
            userId: res.locals.userId,
        },
        // attributes: {
        //     exclude: ['userUserId']
        // }
    }).then((post) => {
        if (post) {
            if (req.file) {
                const postObject = JSON.parse(req.body.post);
                const url = req.protocol + '://' + req.get('host')
                const post = db.Post.create({
                    UserId: res.locals.userId,
                    postTitle: postObject.postTitle,
                    postContent: postObject.postContent,
                    media: url + '/images/' + req.file.filename
                }).then((post) => {
                    res.status(201).json({
                        message: 'Post has been updated successfully!',
                        post
                    });
                }).catch((error) => {
                    res.status(404).json({
                        error: error
                    })
                })
            } else {
                post.update({
                    postTitle: postObject.postTitle,
                    postContent: postObject.postContent,
                    media: postObject.media
                }).then(() => {
                    res.status(200).json({
                        message: 'Post has been updated successfully!',
                        post
                    })
                }).catch(err => {
                    res.send(err)
                })
            }
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
    db.Post.destroy({
        where: {
            id: req.params.id,
            userId: res.locals.userId
        }
    }).then((post) => {
        if (post) {
            res.status(200).json({
                message: 'The post has been deleted successfully!'
            })
        } else {
            res.status(401).json({
                message: 'You cannot access this post.'
            });
        }
    }).catch((error) => {
        res.status(500).json({
            error: error
        })
    })
}

exports.showAllUnreadPosts = (req, res, next) => {
    db.Post.findAll({
        where: {
            "ReadPost.id": null,
            userId: res.locals.userId // User Id extracted from auth middleware
        },
        include: [{
            model: db.ReadPost,
            required: false,
            attributes: []
        }]
    }).then(unreadPosts => {
        res.status(200).json(unreadPosts);
    })
        .catch((error) => {
            res.status(500).json({
                error: 'Error ' + error
            })
        })
}