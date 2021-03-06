const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// const { Post } = require('./Post');

class Comment extends Model {}

Comment.init(
    {
        // column definitions
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id'
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: true,
        tableName: 'comments',
        underscored: true,
        modelName: 'Comment',
    }
);

module.exports = Comment;