const db = require("../models/index.js");
const fs = require('fs');

exports.createAComment = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const commentObject = req.body;
    const comment = db.Comment.create({
        UserId: res.locals.userId,
        PostId: commentObject.postId,
        commentContent: commentObject.commentContent,
        media: req.file ? url + '/media/' + req.file.filename : null
    }).then((post) => {
        res.status(201).json({
            message: 'Comment has been created successfully!',
            post
        });
    }).catch((error) => {
        res.status(404).json({
            error: 'Error: ' + error
        })
    })
};

exports.getAllCommentsOfAPost = (req, res, next) => {
    db.Comment.findAll({
        where: {
            postId: req.params.id
        },
        include: [db.User]

    }).then((comments) => {
        if (comments) {
            res.status(200).json(comments);
        } else {
            res.status(404).json({
                error: 'Comments cannot be found'
            })
        }
    })
        .catch((error) => {
            res.status(400).json({
                error: error
            })
        })
}

exports.deletePicture = (req, res, next) => {
    db.Comment.findOne({
        where: {
            id: req.params.id,
            userId: res.locals.userId
        }
    }).then((comment) => {
        if (comment) {
            const fileName = comment.media.split('/media/')[1]
            fs.unlink('media/' + fileName, () => {
                comment.update({
                    media: null
                })
                    .then(() => {
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
            })
        }
    }).catch((error) => {
        res.status(500).json({
            error: 'Error: ' + error
        })
    })
}

exports.editComment = (req, res, next) => {
    const commentObject = req.body
    db.Comment.findOne({
        where: {
            id: req.params.id,
            UserId: res.locals.userId
        }
    }).then((comment) => {
        if (comment) {
            if (req.file) {
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

// exports.deletePicture = (req, res, next) => {
//     console.log('lolz')
// }

exports.deleteComment = (req, res, next) => {
    db.Comment.findOne({
        where: {
            id: req.params.id,
            UserId: res.locals.userId
        }
    }).then((comment) => {
        if (comment) {
            if (comment.media !== null) {
                const fileName = comment.media.split('/media/')[1];
                fs.unlink('media/' + fileName, () => {
                    db.Comment.destroy({
                        where: {
                            id: req.params.id,
                            UserId: res.locals.userId
                        }
                    })
                        .then(() => {
                            res.json({
                                message: 'The comment has been successfully deleted.',
                                status: 204
                            })
                            res.status(204).json(comment);
                        })
                        .catch((error) => {
                            res.status(400).json;
                            res.json({
                                message: 'Error: ' + error,
                            })
                        })
                })
            } else {
                db.Comment.destroy({
                    where: {
                        id: req.params.id,
                        UserId: res.locals.userId
                    }
                })
                    .then(() => {
                        res.json({
                            message: 'The comment has been successfully deleted.',
                            status: 204
                        })
                        res.status(204).json(comment);
                    })
                    .catch((error) => {
                        res.status(400).json;
                        res.json({
                            message: 'Error: ' + error,
                        })
                    })
            }

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