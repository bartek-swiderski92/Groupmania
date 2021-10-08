const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('./user')

const Post = db.define('post', {
    postId: {
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
    postTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    postContent: {
        type: Sequelize.STRING,
        allowNull: false
    },
    media: {
        type: Sequelize.STRING
    }
}, {
    freezeTableNames: true
});
// Post.sync({
//     force: true
// });

//TODO: belongs to
// Post.hasMany(User);
// Post.belongsTo(User, {
//     foreignKey: 'userId',
//     allowNull: false
// });
module.exports = Post;