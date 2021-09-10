const Sequelize = require('sequelize');
const db = require('../config/database');

const Post = db.define('post', {
    postId: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER
    },
    postTitle: {
        type: Sequelize.STRING
    },
    postContent: {
        type: Sequelize.STRING
    },
    media: {
        type: Sequelize.STRING
    }
});

module.exports = Post;