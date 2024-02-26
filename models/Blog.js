const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init(
 
    {
        title: DataTypes.STRING, 
        body: DataTypes.STRING,
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "User",
                key: 'id',
            },
            },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true, 
        modelName: 'Blog',
    }
);

module.exports = Blog;