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

exports.markAsUnread = (req, res, next) => {
    ReadPost.destroy({
        where: {
            readPostId: req.body.readPostId
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