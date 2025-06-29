const Sequelize = require('sequelize');
const dbConfig = require('../config/connection');

const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const ProductImage = require('../models/ProductImage');
const ProductOption = require('../models/ProductOption');

const models = [User, Category, Product, ProductImage, ProductOption];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dbConfig);

    models.forEach(model => model.init(this.connection));

    models.forEach(model => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });

    this.connection.sync()
      .then(() => console.log('Banco de dados sincronizado!'))
      .catch(err => console.error('Erro ao sincronizar o banco:', err));
  }
}

module.exports = new Database();