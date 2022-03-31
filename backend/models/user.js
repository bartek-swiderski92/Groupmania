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