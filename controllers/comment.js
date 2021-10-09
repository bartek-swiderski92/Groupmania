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


// exports.getAllPosts = (req, res, next) => {
//     Post.findAll({
//             attributes: {
//                 exclude: ['userUserId']
//             }
//         }).then((posts) => {
//             res.status(200).json(posts);
//         })
//         .catch((error) => {
//             console.log(error);
//             res.status(400).json({
//                 error: error
//             })
//         })
// }



// exports.editPost = (req, res, next) => {
//     const postObject = req.body
//     Post.findOne({
//         where: {
//             postId: postObject.postId
//         },
//         attributes: {
//             exclude: ['userUserId']
//         }
//     }).then((post) => {
//         if (post) {
//             post.update({
//                 postTitle: postObject.postTitle,
//                 postContent: postObject.postContent,
//                 media: postObject.media
//             }).then(() => {
//                 res.status(200).json({
//                     success: 'Post has been updated successfully!'
//                 })
//             }).catch(err => {
//                 res.send(err)
//             })
//         } else {
//             res.status(404);
//             res.send('The post no longer exists')
//         }
//     }).catch(err => {
//         res.send('error: ' + err)
//     })
// }

// exports.deletePost = (req, res, next) => {
//     Post.destroy({
//         where: {
//             postId: req.params.id
//         }
//     }).then((post) => {
//         if (post) {
//             res.json({
//                 status: 'The post has been successfully deleted.'
//             })
//             res.status(204).json(post);

//         } else {
//             res.status(404);
//             res.json({
//                 status: 'The post could not be found.'
//             })
//         }
//     }).catch((error) => {
//         res.status(404).json({
//             error: error
//         })
//     })
// }