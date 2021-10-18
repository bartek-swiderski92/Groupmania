const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('./user');
const Post = require('./post');


const readPost = db.define('readpost', {
    readPostId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        default: 0,
        unique: true,
        allowNull: false
    },
    postId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    freezeTableNames: true
});
readPost.sync({
    force: true
});
module.exports = readPost;