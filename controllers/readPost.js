const ReadPost = require('../models/readPost');

exports.markAsRead = (req, res, next) => {
    const readPostObject = req.body;

    const readPost = ReadPost.create({
        userId: readPostObject.userId,
        postId: readPostObject.postId
    }).then((readPost) => {
        res.status(201).json(readPost);
    }).catch((error) => {
        res.status(404).json({
            error: error
        })
    })
}

exports.removeLike = (req, res, next) => {
    Like.destroy({
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
            res.status(404).json({
                status: 'The like could not be found.'
            });
        }
    }).catch((error) => {
        res.status(404).json({
            error: error
        })
    })
}