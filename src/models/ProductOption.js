const { Model, DataTypes } = require('sequelize');
const connection = require('../config/connection');
const Product = require('./Product');

class ProductOption extends Model {}

ProductImage.init({
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
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    shape:{
        type: DataTypes.ENUM('circle', 'square'),
        defaultValue: 'square',
        allowNull: false,
    },
    radius: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    type:{
        type: DataTypes.ENUM('text', 'color'),
        defaultValue: 'text',
        allowNull: true,
    },
    values:{
        type: DataTypes.STRING,
        defaultValue: false
    }

},{
    sequelize: connection,
    tableName: "opcoes_produto",
    timestamps: true,
    }
);

module.exports = ProductOption;