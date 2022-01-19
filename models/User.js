const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    authenticateUser = (testPassword) => {
        return bcrypt.compareSync(testPassword, this.password);
    }
}

User.init(
    {
        // column definitions
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 64]
            }
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0,
        }
    },
    {
        hooks: {
            beforeCreate: async (userData) => {
                userData.password = await bcrypt.hash(userData.password, 10);
                return userData;
            },
            beforeUpdate: async (userData) => {
                userData.password = await bcrypt.hash(userData.password, 10)
                return userData;
            },
        },
        sequelize,
        timestamps: true,
        tableName: 'users',
        underscored: true,
        modelName: 'User',
    }
);

module.exports = User;