const connection = require('../config/connection');
const { Model, DataTypes} = require("sequelize");
const bcrypt = require('bcrypt');

class User extends Model {}

User.init(
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        passaword: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize: connection,
        tableName: "Usuarios",
        timestamps: true,
        hooks:{
            beforeCreate: async(user) => {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    }
)

module.exports = User;