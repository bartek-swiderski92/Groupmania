const Sequelize = require('sequelize');
const db = require('../config/database');
const Post = require('./post')


const User = db.define('user', {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        default: 0,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    secondName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    profilePicture: {
        type: Sequelize.STRING,
        defaultValue: 'no-url'
        //TODO: add default picture
        // add folder to the application with a profile picture
    },
    gender: {
        type: Sequelize.STRING,
        defaultValue: 'Unknown'
    },
    dob: {
        type: Sequelize.DATE,
        defaultValue: 0
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, {
    timeStamps: true,
    updatedAt: false,
    freezeTableNames: true
});
// User.sync({
//     force: true
// });
User.hasMany(Post
    //     , {
    //     foreignKey: 'userId'
    // }
);
Post.belongsTo(User
    //     , {
    //     foreignKey: 'postId'
    // }
);
module.exports = User;