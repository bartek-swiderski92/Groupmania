const Post = require('../models/post');
const fs = require('fs');
const {
    secureHeapUsed
} = require('crypto');

// const {
//     Z_FIXED
// } = require('zlib');

exports.getAllPosts = (req, res, next) => {
    Post.findAll().then((posts) => {
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
        //TODO: add if(post)
        res.status(200).json(post);
    }).catch((error) => {
        res.status(404).json({
            error: error
        })
    })
}

exports.createAPost = (req, res, next) => {
    const postObj = req.body;

    const post = Post.create({
        userId: postObj.userId,
        postTitle: postObj.postTitle,
        postContent: postObj.postContent,
        media: postObj.media
    }).then(() => {
        res.status(200).json(post);
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

exports.deletePost = (req, res, next) => {
    Post.deleteOne({
        where: {
            postId: req.params.id
        }
    }).then((sauce) => {
        res.status(200).json({
            message: 'Post has been successfully deleted!'
        });
    }).catch((error) => {
        res.status(400).json({
            error: error
        })
    })
}