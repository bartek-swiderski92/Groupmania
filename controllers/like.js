const Like = require('../models/like');

exports.likeAPost = (req, res, next) => {
    const likeObject = req.body;

    const like = Like.create({
        userId: res.locals.userId,
        postId: likeObject.postId
    }).then((like) => {
        res.status(201).json(like);
    }).catch((error) => {
        res.status(404).json({
            error: error
        })
    })
}

exports.removeLike = (req, res, next) => {
    Like.destroy({
        where: {
            likeId: req.params.id,
            userId: res.locals.userId
        }
    }).then((like) => {
        if (like) {
            res.json({
                status: 'The like has been removed.'
            })
            res.status(204).json(like);

        } else {
            res.status(401).json({
                status: 'You cannot access this element.'
            });
        }
    }).catch((error) => {
        res.status(404).json({
            error: error
        })
    })
}