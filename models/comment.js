const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('./user')
const Post = require('./post')

const Comment = db.define('comment', {
    commentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        default: 0,
        unique: true,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    postId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    commentContent: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    freezeTableNames: true
});
//TODO: belongs to

module.exports = Comment;