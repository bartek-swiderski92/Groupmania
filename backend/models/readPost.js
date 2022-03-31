module.exports = (sequelize) => {
    const readPost = sequelize.define("ReadPost", {})

    readPost.associate = models => {
        readPost.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            },
            onDelete: "CASCADE",
            foreignKeyConstrains: true
        })
        readPost.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false
            },
            onDelete: "CASCADE",
            foreignKeyConstrains: true
        })
    }
    return readPost
}