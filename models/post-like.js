const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('./user');
const Post = require('./post'); 


const PostLike = db.define('post_likes', {
    postLikesId: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    postId: {
        type: Sequelize.INTEGER,
    },
    userId: {
        type: Sequelize.INTEGER
    }
}, {
    freezeTableNames: true
});

module.exports = Like;