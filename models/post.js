const Sequelize = require('sequelize');
const db = require('../config/database');
const User = require('./user')

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
}, {
    freezeTableNames: true
});
// Post.sync({
//     force: true
// });

//TODO: belongs to
// Post.hasMany(User);
// User.belongsTo(Post, {
//     foreignKey: 'postId'
// });
module.exports = Post;