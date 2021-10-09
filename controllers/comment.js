const Comment = require('../models/comment');
const fs = require('fs');
const {
    secureHeapUsed
} = require('crypto');

// const {
//     Z_FIXED
// } = require('zlib');

exports.createAComment = (req, res, next) => {
    const commentObject = req.body;

    const comment = Comment.create({
        userId: commentObject.userId,
        postId: commentObject.postId,
        commentContent: commentObject.commentContent,
        media: commentObject.media
    }).then((post) => {
        res.status(201).json(post);
        res.json({
            status: 'Comment has been successfully created!'
        });
    }).catch((error) => {
        res.status(404).json({
            error: error
        })
    })
};


exports.getAllCommentsOfAPost = (req, res, next) => {
    Comment.findAll({
            where: {
                postId: req.params.id
            },
            attributes: {
                exclude: ['userUserId']
            }
        }).then((comments) => {
            res.status(200).json(comments);
        })
        .catch((error) => {
            res.status(400).json({
                error: error
            })
        })
}



exports.editComment = (req, res, next) => {
    const commentObject = req.body
    Comment.findOne({
        where: {
            commentId: commentObject.commentId
        }
    }).then((comment) => {
        if (comment) {
            comment.update({
                commentContent: commentObject.commentContent,
                media: commentObject.media
            }).then(() => {
                res.status(200).json({
                    success: 'Comment has been updated successfully!'
                })
            }).catch(err => {
                res.send(err)
            })
        } else {
            res.status(404);
            res.send('The comment no longer exists')
        }
    }).catch(err => {
        res.send('error: ' + err)
    })
}

exports.deleteComment = (req, res, next) => {
    Comment.destroy({
        where: {
            commentId: req.params.id
        }
    }).then((comment) => {
        if (comment) {
            res.json({
                status: 'The comment has been successfully deleted.'
            })
            res.status(204).json(comment);

        } else {
            res.status(404);
            res.json({
                status: 'The comment could not be found.'
            })
        }
    }).catch((error) => {
        res.status(404).json({
            error: error
        })
    })
}