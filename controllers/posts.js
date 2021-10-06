const Post = require('../models/post');
const fs = require('fs');

//TODO: Z_FIXED?
// const {
//     Z_FIXED
// } = require('zlib');

exports.getAllPosts = (req,res,next) =>{
    Post.find().then((posts)=>{
        res.status(200).json(posts);
    })
    .catch((error) =>{
        console.log(error);
        res.status(400).json({
            error: error
        })
    })
}
