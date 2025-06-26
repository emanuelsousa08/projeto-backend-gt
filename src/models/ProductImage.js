const { DataTypes } = require('sequelize');
const connection = require('../config/connection');
const Product = require('./Product');


const ProductImage = connection.define({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Product,
            key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    path:{
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
        tableName: "imagensProduto",
        timestamps: true,
    });

module.exports = ProductImage;