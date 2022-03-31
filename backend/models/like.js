module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define("Like", {})

    Like.associate = models => {
        Like.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            },
            onDelete: "CASCADE",
            foreignKeyConstrains: true
        })
        Like.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false
            },
            onDelete: "CASCADE",
            foreignKeyConstrains: true
        })
    }
    return Like
}