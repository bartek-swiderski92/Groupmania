// const Sequelize = require('sequelize');
// const db = require('../config/database');
// const User = require('./user')

// const Post = db.define('post', {
//     postId: {
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
//     postTitle: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     postContent: {
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
// // Post.hasMany(User);
// // Post.belongsTo(User, {
// //     foreignKey: 'userId',
// //     allowNull: false
// // });
// module.exports = (sequelize, DataTypes) => Post;

module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        postTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postContent: {
            type: DataTypes.STRING,
            allowNull: false
        },
        media: {
            type: DataTypes.STRING
        }
    })

    Post.associate = models => {
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            },
            onDelete: "CASCADE",
            foreignKeyConstrains: true
        })
        Post.hasMany(models.Comment,
            {
                onDelete: "CASCADE",
                foreignKeyConstrains: true

            }
        );
        Post.hasMany(models.Like,
            {
                onDelete: "CASCADE",
                foreignKeyConstrains: true

            }
        );
        Post.hasMany(models.ReadPost,
            {
                onDelete: "CASCADE",
                foreignKeyConstrains: true

            }
        );
    }

    // Post.sync({
    //     force: true
    // });
    return Post
}