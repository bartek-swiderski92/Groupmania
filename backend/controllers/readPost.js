const db = require("../models/index.js");

exports.markAsRead = (req, res, next) => {
    //Checking for duplicates
    db.ReadPost.findOne({
        where: {
            PostId: req.params.id,
            UserId: res.locals.userId
        }
    }).then(readPost => {
        if (!readPost) {
            const readPost = db.ReadPost.create({
                UserId: res.locals.userId,
                PostId: req.params.id
            }).then((readPost) => {
                res.status(201).json(readPost);
            }).catch(() => {
                res.status(401).json({
                    error: 'You cannot access this element.'
                })
            })
        } else {
            res.status(500).json({
                error: 'Post has been already marked as read!'
            })
        }
    })
}

exports.markAsUnread = (req, res, next) => {
    db.ReadPost.destroy({
        where: {
            PostId: req.params.id,
            UserId: res.locals.userId
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

