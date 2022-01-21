const db = require("../models/index.js");

exports.getAllLikes = (req, res, next) => {
    db.Like.findAll({
        where: {
            PostId: req.body.postId
        }
    })
        .then((likes) => {
            res.status(200).json(likes)
        })
        .catch((error) => {
            res.status(400).json({
                error: error
            })
        })
}

exports.likeAPost = (req, res, next) => {
    const likeObject = req.body;
    //Checking for duplicates
    db.Like.findOne({
        where: {
            UserId: res.locals.userId,
            PostId: likeObject.postId
        }
    }).then((like) => {
        if (!like) {
            const like = db.Like.create({
                UserId: res.locals.userId,
                PostId: likeObject.postId
            }).then((like) => {
                res.status(201).json(like);
            }).catch(() => {
                res.status(401).json({
                    error: 'You cannot access this element.'
                })
            })
        } else {
            res.status(500).json({
                error: 'The post has been already liked!'
            })
        }
    })
}

exports.removeLike = (req, res, next) => {
    db.Like.destroy({
        where: {
            PostId: req.params.id,
            UserId: res.locals.userId
        }
    }).then((like) => {
        if (like) {
            res.json({
                status: 'The like has been removed.'
            })
            res.status(204).json(like);

        } else {
            res.status(401).json({
                error: 'You cannot access this element.'
            });
        }
    }).catch((error) => {
        res.status(404).json({
            error: error
        })
    })
}