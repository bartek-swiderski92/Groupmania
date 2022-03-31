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