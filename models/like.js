const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('./user');
const Post = require('./post');


const Like = db.define('likes', {
    likeId: {
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
// Like.sync({
//     force: true
// });
module.exports = Like;