const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING,
    },
    firstName: {
        type: Sequelize.STRING
    },
    secondName: {
        type: Sequelize.STRING
    },
    profilePicture: {
        type: Sequelize.STRING, default : 'Unknown'
        //TODO: add default picture
    },
    gender: {
        type: Sequelize.STRING, default: 'Unknown'
    },
    dob: {
        type: Sequelize.DATE, default: 'unknown'
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        default: false
    }
}, {
    timeStamps: true,
    updatedAt: false
});

module.exports = User;