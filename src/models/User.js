const { Model, DataTypes } = require('sequelize');
const connection = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, //garante que todo id será único e nunca será null
        autoIncrement: true,
        //unique: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize: connection,
    tableName: 'usuarios',
    timestamps: true,
    hooks:{
            beforeCreate: async(user) => {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt); //senha com criptografia (hash)
            }
    }
});

module.exports = User;