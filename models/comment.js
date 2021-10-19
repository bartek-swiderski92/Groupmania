// const Sequelize = require('sequelize');
// const db = require('../config/database');


// const Comment = db.define('comment', {
//     commentId: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         default: 0,
//         unique: true,
//         allowNull: false
//     },
//     userId: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     postId: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     commentContent: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     media: {
//         type: Sequelize.STRING
//     }
// }, {
//     freezeTableNames: true
// });
// //TODO: belongs to
// // Comment.sync({
// //     force: true
// // });
// module.exports = Comment;


module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
        commentContent: {
            type: DataTypes.STRING,
            allowNull: false
        },
        media: {
            type: DataTypes.STRING
        }
    })

    Comment.associate = models => {
        Comment.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
        Comment.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    return Comment
}