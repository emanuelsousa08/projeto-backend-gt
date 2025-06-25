const { Model, DataTypes } = require('sequelize');
const connection = require('../config/connection');


class Category extends Model {}

Category.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true
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
    sequelize: connection,
    tableName: 'categorias',
    timestamps: true
});

module.exports = Category;