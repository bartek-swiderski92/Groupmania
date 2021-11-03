const db = require("../models/index.js");

const fs = require('fs');
const {
    secureHeapUsed
} = require('crypto');

// const {
//     Z_FIXED
// } = require('zlib');

exports.createAComment = (req, res, next) => {
    const commentObject = JSON.parse(req.body.post);
    const url = req.protocol + '://' + req.get('host')
    const comment = db.Comment.create({
        UserId: res.locals.userId,
        PostId: commentObject.postId,
        commentContent: commentObject.commentContent,
        media: url + '/images/' + req.file.filename
    }).then((post) => {
        res.status(201).json({
            status: 'Comment has been successfully created!',
            post
        });
    }).catch((error) => {
        res.status(404).json({
            error: 'Error: ' + error
        })
    })
};


// exports.getAllCommentsOfAPost = (req, res, next) => {
//     Comment.findAll({
//             where: {
//                 postId: req.params.id
//             }
//         }).then((comments) => {
//             if (comments) {
//                 res.status(200).json(comments);
//             } else {
//                 res.status(404).json({
//                     error: 'Comments cannot be found'
//                 })
//             }
//         })
//         .catch((error) => {
//             res.status(400).json({
//                 error: error
//             })
//         })
// }

// exports.removeAllCommentsOfAPost = (req, res, next) => {
//     Comment.destroy({
//             where: {
//                 postId: req.params.id
//             }
//         }).then((comments) => {
//             if (comments) {
//                 res.status(200).json('Comments have been successfully removed');
//             } else {
//                 res.status(404).json('No comments to delete');
//             }
//         })
//         .catch((error) => {
//             res.status(400).json({
//                 error: error
//             })
//         })
// }


exports.editComment = (req, res, next) => {
    const commentObject = req.body
    db.Comment.findOne({
        where: {
            id: commentObject.id,
            UserId: res.locals.userId
        }
    }).then((comment) => {
        if (comment) {
            if(req.file) {
                const commentObject = JSON.parse(req.body.post);
                const url = req.protocol + '://' + req.get('host')
                const comment = db.Comment.create({
                    UserId: res.locals.userId,
                    PostId: commentObject.postId,
                    commentContent: commentObject.commentContent,
                    media: url + '/images/' + req.file.filename
                }).then((post) => {
                    res.status(201).json({
                        status: 'Comment has been successfully created!',
                        post
                    });
                }).catch((error) => {
                    res.status(404).json({
                        error: 'Error: ' + error
                    })
                })
            } else {
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
            }
        } else {
            res.status(404).json({
                status: 'You cannot access this content.'
            });
        }
    }).catch(err => {
        res.send('error: ' + err)
    })
}

exports.deleteComment = (req, res, next) => {
    db.Comment.destroy({
        where: {
            id: req.body.id,
            UserId: res.locals.userId
        }
    }).then((comment) => {
        if (comment) {
            res.json({
                status: 'The comment has been successfully deleted.'
            })
            res.status(204).json(comment);

        } else {
            res.status(401).json({
                status: 'You cannot access this content.'
            })
        }
    }).catch((error) => {
        res.status(404).json({
            error: '' + error
        })
    })
}