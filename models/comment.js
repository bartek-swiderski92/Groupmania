const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('./user')
const Post = require('./post')

const Comment = db.define('comment', {
    commentId: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER
    },
    postId: {
        type: Sequelize.INTEGER
    },
    commentContent: {
        type: Sequelize.STRING
    }
}, {
    freezeTableNames: true
});
//TODO: belongs to

module.exports = Comment;