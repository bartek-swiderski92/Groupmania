// const Sequelize = require('sequelize');
// const db = require('../config/database');
// const Post = require('./post')


// const User = db.define('user', {
//     userId: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         default: 0,
//         unique: true,
//         allowNull: false
//     },
//     email: {
//         type: Sequelize.STRING,
//         unique: true,
//         allowNull: false
//     },
//     password: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     firstName: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     secondName: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     profilePicture: {
//         type: Sequelize.STRING,
//         defaultValue: '../media/default-picture.png'

//     },
//     gender: {
//         type: Sequelize.STRING,
//         defaultValue: 'Unknown'
//     },
//     dob: {
//         type: Sequelize.DATE,
//         defaultValue: 0
//     },
//     isAdmin: {
//         type: Sequelize.BOOLEAN,
//         defaultValue: false
//     }
// }, {
//     timeStamps: true,
//     updatedAt: false,
//     freezeTableNames: true
// });
// User.sync({
//     force: true
// });
// // User.hasMany(Post
//     //     , {
//     //     foreignKey: 'userId'
//     // }
// // );
// // Post.belongsTo(User
//     //     , {
//     //     foreignKey: 'postId'
//     // }
// // );
// module.exports = (sequelize, DataTypes) => User;



module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        secondName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profilePicture: {
            type: DataTypes.STRING,
            defaultValue: '../media/default-picture.png'
        },
        gender: {
            type: DataTypes.STRING,
            defaultValue: 'Unknown'
        },
        dob: {
            type: DataTypes.DATE,
            defaultValue: 0
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })

    User.associate = models => {
        User.hasMany(models.Post, {
            onDelete: "cascade"
        });
        User.hasMany(models.Comment, {
            onDelete: "cascade"
        });
        User.hasMany(models.Like, {
            onDelete: "cascade"
        });
        User.hasMany(models.ReadPost, {
            onDelete: "cascade"
        });
    }

    return User
};