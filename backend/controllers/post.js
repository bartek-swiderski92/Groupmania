const Post = require('../models/post');
const ReadPost = require('../models/readpost');
const db = require("../models/index.js");
const fs = require('fs');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;
const {
    secureHeapUsed
} = require('crypto');
const { post } = require('../routes/post');

exports.getAllPosts = (req, res, next) => {
    db.Post.findAll({
        include: [db.User, { model: db.Comment, include: db.User }, db.Like, db.ReadPost]
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

exports.createAPost = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const postObject = req.body;
    const post = db.Post.create({
        UserId: res.locals.userId,
        postTitle: postObject.postTitle,
        postContent: postObject.postContent,
        media: req.file ? url + '/media/' + req.file.filename : null
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
        }
    }).then((post) => {
        if (post) {
            const url = req.protocol + '://' + req.get('host')
            post.update({
                postTitle: postObject.postTitle,
                postContent: postObject.postContent,
                media: req.file ? url + '/media/' + req.file.filename : post.dataValues.media
            }).then(() => {
                res.status(200).json({
                    message: 'Post has been updated successfully!',
                    post
                })
            }).catch((error) => {
                res.status(500).json({
                    error: 'Error: ' + error
                })
            })

        } else {
            res.status(404).json({
                error: 'You cannot access this post'
            });
        }
    }).catch(error => {
        res.status(500).json({
            error: 'Error: ' + error
        });
    })
}

exports.deletePicture = (req, res, next) => { //Used when replacing or removing picture only from the post
    db.Post.findOne({
        where: {
            id: req.params.id,
            userId: res.locals.userId
        }
    }).then((post) => {
        if (post) {
            const fileName = post.media.split('/media/')[1]
            fs.unlink('media/' + fileName, () => {
                post.update({
                    media: null
                })
                    .then(() => {
                        console.log(post)
                        res.status(200).json({
                            message: 'The picture has been deleted!'
                        })
                    })
                    .catch((error) => {
                        res.status(400).json({
                            error: 'Error: ' + error
                        })
                    })
            })
        } else {
            res.status(401).json({
                message: 'You cannot access this content.'
            });
        }
    }).catch((error) => {
        res.status(500).json({
            error: 'ERR!: ' + error
        })
    })
}

exports.deletePost = (req, res, next) => {
    db.Post.findOne({
        where: {
            id: req.params.id,
            userId: res.locals.userId
        }
    }).then((post) => {
        if (post) {
            if (post.media !== null) {
                const fileName = post.media.split('/media/')[1]
                fs.unlink('media/' + fileName, () => {
                    db.Post.destroy({
                        where: {
                            id: req.params.id,
                            userId: res.locals.userId
                        }
                    })
                        .then(() => {
                            res.status(200).json({
                                message: 'The post has been deleted successfully!'
                            })
                        })
                        .catch((error) => {
                            res.status(400).json({
                                error: 'Error: ' + error
                            })
                        })
                })
            } else {
                db.Post.destroy({
                    where: {
                        id: req.params.id,
                        userId: res.locals.userId
                    }
                })
                    .then(() => {
                        res.status(200).json({
                            message: 'The post has been deleted successfully!'
                        })
                    })
                    .catch((error) => {
                        res.status(400).json({
                            error: 'Error: ' + error
                        })
                    })
            }
        } else {
            res.status(401).json({
                message: 'You cannot access this post.'
            });
        }
    }).catch((error) => {
        res.status(500).json({
            error: 'Error: ' + error
        })
    })
}

exports.showAllUnreadPosts = (req, res, next) => {
    db.Post.findAll({
        where: {
            '$readposts.UserId$': res.locals.userId // User Id extracted from auth middleware
        },
        attributes: ['id'],
        include: [{
            model: db.ReadPost,
            required: false,
            attributes: [],
        }]
    }).then(readPosts => {
        db.Post.findAll({
            where: {
                id: {
                    [Op.not]: (() => readPosts.map(readPost => readPost.id))()
                }
            },
            include: [db.User, { model: db.Comment, include: db.User }, db.Like, db.ReadPost]

        })
            .then((unreadPosts) => {
                res.status(200).json(unreadPosts);
            })
            .catch((error) => {
                res.status(500).json({
                    error: 'Error' + error
                })
            })

    })
        .catch((error) => {
            res.status(500).json({
                error: 'Error ' + error
            })
        })
}