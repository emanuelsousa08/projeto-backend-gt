const { Model, DataTypes } = require('sequelize');
const connection = require('../config/connection');
const Product = require('./Product');
const Category = require('./Category');

class ProductCategory extends Model {}

ProductCategory.init({
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Product,
            key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: "id"
        }
    }
},{
    sequelize: connection,
    tableName: "produtos_e_categorias",
    timestamps: true,
    });

module.exports = ProductCategory;
