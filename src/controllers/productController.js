const Product = require('../models/Product');
const Category = require('../models/Category');
const ProductImage = require('../models/ProductImage');
const ProductOption = require('../models/ProductOption');
const { Op } = require('sequelize');

class ProductController {
  getAllProducts = async (req, res) => {
    try {
      // const products = await Product.findAll();
      // return res.status(200).json(products);
    const {
        limit = 12,
        page = 1,
        fields,
        match,
        category_ids,
        ['price-range']: priceRange,
        ...optionsFilters
      } = req.query;

      const parsedLimit = parseInt(limit);
      const parsedPage = parseInt(page);
      const offset = parsedLimit === -1 ? null : (parsedPage - 1) * parsedLimit;
      const where = {};

      if (match) {
        where[Op.or] = [
          { name: { [Op.like]: `%${match}%` } },
          { description: { [Op.like]: `%${match}%` } }
        ];
      }

      if (priceRange && priceRange.includes('-')) {
        const [min, max] = priceRange.split('-').map(Number);
        where.price = { [Op.between]: [min, max] };
      }

      const includeCategory = category_ids
        ? {
            model: Category,
            as: 'categories',
            where: {
              id: { [Op.in]: category_ids.split(',').map(Number) }
            },
            through: { attributes: [] }
          }
        : {
            model: Category,
            as: 'categories',
            through: { attributes: [] }
          };

      const selectedFields = fields ? fields.split(',') : null;

      const total = await Product.count({ where });

      const products = await Product.findAll({
        where,
        include: [
          includeCategory,
          { model: ProductImage, as: 'images' },
          { model: ProductOption, as: 'options' }
        ],
        ...(parsedLimit !== -1 && { limit: parsedLimit }),
        ...(offset !== null && { offset }),
        ...(selectedFields && { attributes: selectedFields })
      });

      return res.status(200).json({
        data: products,
        total,
        limit: parsedLimit,
        page: parsedPage
      });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao listar produtos" });
    }
  };

  getProductById = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findByPk(productId,{
        include: [
          {model: Category, as: 'categories', through: {attributes:[]}},
          {model: ProductImage, as: 'images'},
          {model: ProductOption, as: 'options'}]
      });

      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      const formattedProduct = {
        id: product.id,
        name: product.name,
        slug:product.slug,
        description: product.description,
        price: product.price,
        price_discount: product.price_discount,
        enabled: product.enabled,
        created_at: product.createdAt,
        update_at: product.updateAt,
        category_ids: product.categories.map(cat=>cat.id),
        images: product.images,
        options: product.options
      }
      return res.status(200).json(formattedProduct);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar produto" });
    }
  };

  createProduct = async (req, res) => {
    try {
      // const token = req.headers.authorization;
      // if(!token||token !== '123456'){
      //   return res.status(401).json({ message: 'Token inválido ou ausente' });
      // }
      const { name, slug, description, price, price_with_discount, enabled, stock, category_ids, images, options } = req.body;

      if (!name || !slug || !description || !category_ids || price === undefined || price_with_discount === undefined) {
        return res.status(400).json({ message: "Campos obrigatórios não preenchidos" });
      }

      const newProduct = await Product.create({
        name,
        slug,
        description,
        price,
        price_discount,
        enabled,
        stock
      });

      if(category_ids && Array.isArray(category_ids)){
        await newProduct.setCategories(category_ids); //relaciona uma tabela com a outra; é do sequelize - guarda o retorno do Product.create()
      }

      if (images && Array.isArray(images)) {
        const imageRecords = images.map(path => ({ product_id: newProduct.id, path }));
        await ProductImage.bulkCreate(imageRecords); //cria vários itens de uma vez só - é do sequelize
      }

      if (options && Array.isArray(options)) {
        const optionRecords = options.map(opt => ({
          product_id: newProduct.id,
          title: opt.title,
          shape: opt.shape,
          radius: opt.radius,
          type: opt.type,
          values: opt.values
        }));
        await ProductOption.bulkCreate(optionRecords); //cria várias opções de produtos de uma só vez; é do sequelize
      }

      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  updateProduct = async (req, res) => {
    try {
      // const token = req.headers.authorization;
      // if (!token || token !== 'Bearer 123456') {
      //   return res.status(401).json({ message: 'Token inválido ou ausente' });
      // }
      const productId = req.params.id;
      const { name, slug, description, price, price_with_discount, enabled, stock, category_ids, images, options } = req.body;

      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      await product.update({
        name,
        slug,
        description,
        price,
        price_with_discount,
        enabled,
        stock
      });

      if(category_ids && Array.isArray(category_ids)) {
        await product.setCategories(category_ids);
      }

      await ProductImage.destroy({ where: { product_id: product.id } }); //no readme do gtech pede pra substituir tudo de uma vez
      if (images && Array.isArray(images)) {
        const imageRecords = images.map(path => ({ product_id: product.id, path }));
        await ProductImage.bulkCreate(imageRecords); //cria vários itens
      }
      //como apagou as imagens, aí pode querer atualizar o options tbm; mesma lógica do anterior
      await ProductOption.destroy({ where: { product_id: product.id } });
      if (options && Array.isArray(options)) {
        const optionRecords = options.map(opt => ({
          product_id: product.id,
          title: opt.title,
          shape: opt.shape,
          radius: opt.radius,
          type: opt.type,
          values: opt.values
        }));
        await ProductOption.bulkCreate(optionRecords);
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      // const token = req.headers.authorization;
      // if (!token || token !== 'Bearer 123456') {
      //   return res.status(401).json({ message: 'Token inválido ou ausente' });
      // }
      const productId = req.params.id;
      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      await ProductImage.destroy({where: {product_id: product.id}});
      await ProductOption.destroy({where: {product_id: product.id}});
      await product.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar produto" });
    }
  };
}

module.exports = ProductController;