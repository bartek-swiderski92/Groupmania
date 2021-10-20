const ReadPost = require('../models/readPost');
const db = require("../models/index.js");


exports.markAsRead = (req, res, next) => {
    const readPost = ReadPost.create({
        userId: res.locals.userId,
        postId: req.body.postId
    }).then((readPost) => {
        res.status(201).json(readPost);
    }).catch((error) => {
        res.status(404).json({
            error: error
        })
    })
}

exports.markAsUnread = (req, res, next) => {
    ReadPost.destroy({
        where: {
            readPostId: req.body.readPostId,
            userId: res.locals.userId
        }
    }).then((readPost) => {
        if (readPost) {
            res.json({
                status: 'The post has been marked as unread.'
            })
            res.status(204).json(readPost);

        } else {
            res.status(404).json({
                status: 'Post has not been read yet.'
            });
        }
    }).catch((error) => {
        res.status(500).json({
            error: 'Internal server error: ' + error
        })
    })
}

exports.showAllUnreadPosts = (req, res, next) => {
    ReadPost.findAll({
            include: [Post]
        })
        .then(unReadPosts => {
            res.status(200).json(unReadPosts)
        }).catch(error => {
            res.status(500).json({
                error: error
            })
        })
}