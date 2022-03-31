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
                allowNull: false, name: "UserId"
            },
            onDelete: "CASCADE",
            foreignKeyConstrains: true
        })
        Comment.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false, name: "PostId"
            },
            onDelete: "CASCADE",
            foreignKeyConstrains: true
        })
    }
    return Comment
}
// Comment.sync({
//     force: true
// });