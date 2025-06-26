const { DataTypes } = require('sequelize');
const connection = require('../config/connection');



const Category = connection.define({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, //garante que todo id será único e nunca será null
        autoIncrement: true,
        //unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    },
    use_in_menu: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: true
    }
},{
    tableName: 'categorias',
    timestamps: true
});

module.exports = Category;