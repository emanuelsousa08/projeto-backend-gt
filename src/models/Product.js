const { DataTypes } = require('sequelize');
const connection = require('../config/connection');
const Category = require('./Category');



const Product = connection.define({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, //garante que todo id será único e nunca será null
        autoIncrement: true,
        //unique: true
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: true
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
        allowNull: true,
        references: {
            model: Category,
            key: "use_in_menu"
        }
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    price_with_discount: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
},{
    tableName: "produtos",
    timestamps: true
});

module.exports = Product;