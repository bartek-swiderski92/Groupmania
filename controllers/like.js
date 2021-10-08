const Like = require('../models/like');

exports.sendLike = (req, res, next) => {
    const likeObj = req.body;

    const like = Like.create({
        userId: likeObj.userId,
        postId: likeObj.postId
    }).then((like) => {
        res.status(201).json(like);
        res.json({
            status: 'Like!'
        });
    }).catch((error) => {
        res.status(404).json({
            error: error
        })
    })
}



exports.likeAPost = (req, res, next) => {
    const likeObj = req.body;

    const like = Like.create({
        userId: likeObj.userId,
        postId: likeObj.postId
    }).then((like) => {
        res.status(201).json(like);
        res.json({
            status: 'Like!'
        });
    }).catch((error) => {
        res.status(404).json({
            error: error
        })
    })
}

exports.removeLike = (req, res, next) => {
    Post.destroy({
        where: {
            likeId: req.params.id
        }
    }).then((like) => {
        if (like) {
            res.json({
                status: 'The like has been removed.'
            })
            res.status(204).json(like);

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