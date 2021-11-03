// const Sequelize = require('sequelize');
// const db = require('../config/database');
// const User = require('./user');
// const Post = require('./post');


// const Like = db.define('likes', {
//     likeId: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         default: 0,
//         unique: true,
//         allowNull: false
//     },
//     postId: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     userId: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     }
// }, {
//     freezeTableNames: true
// });
// // Like.sync({
// //     force: true
// // });
// module.exports = Like;

module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define("Like", {})

    Like.associate = models => {
        Like.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
        Like.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    return Like
}