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
            console.log(error);
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
            res.json({
                status: 'The post could not be found.'
            })
        }
    }).catch((error) => {
        res.status(404).json({
            error: error
        })
    })
}

exports.createAPost = (req, res, next) => {
    const postObject = req.body;

    const post = Post.create({
        userId: postObject.userId,
        postTitle: postObject.postTitle,
        postContent: postObject.postContent,
        media: postObject.media
    }).then((post) => {
        res.status(201).json(post);
        res.json({
            status: 'Post has been successfully created!'
        });
    }).catch((error) => {
        res.status(404).json({
            error: error
        })
    })
    // const postObj = req.body;
    // const post = new Post({
    //     userId: postObj.userId,
    //     postTitle: postObj.postTitle,
    //     postContent: postObj.postContent,
    //     media: postObj.media
    // });
    // post.save().then(() => {
    //     res.status(201).json({
    //         message: 'Post created successfully!'
    //     });
    // }).catch((error) => {
    //     res.status(500).json({
    //         error: error
    //     });
    // });
};

exports.editPost = (req, res, next) => {
    const postObject = req.body
    Post.findOne({
        where: {
            postId: postObject.postId
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
            res.send('The post no longer exists')
        }
    }).catch(err => {
        res.send('error: ' + err)
    })
}

exports.deletePost = (req, res, next) => {
    Post.destroy({
        where: {
            postId: req.params.id
        }
    }).then((post) => {
        if (post) {
            res.json({
                status: 'The post has been successfully deleted.'
            })
            res.status(204).json(post);

        } else {
            res.json({
                status: 'The post could not be found.'
            })
        }
    }).catch((error) => {
        res.status(404).json({
            error: error
        })
    })
}