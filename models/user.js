const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING
    },
    secondName: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    profilePicture: {
        type: Sequelize.STRING
    },
    gender: {
        type: Sequelize.STRING
    },
    dob: {
        type: Sequelize.DATE
    },
    isAdmin: {
        type: Sequelize.BOOLEAN
    }
}, {
    timeStamps: true,
    updatedAt: false
});

module.exports = User;