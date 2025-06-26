const Product = require('../models/Product');

class ProductController {
  getAllProducts = async (req, res) => {
    try {
      const products = await Product.findAll();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao listar produtos" });
    }
  };

  getProductById = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar produto" });
    }
  };

  createProduct = async (req, res) => {
    try {
      const { enabled, name, slug, use_in_menu, stock, description, price, price_with_discount } = req.body;

      if (!name || !slug || price === undefined || price_with_discount === undefined) {
        return res.status(400).json({ message: "Campos obrigatórios não preenchidos" });
      }

      const newProduct = await Product.create({
        enabled,
        name,
        slug,
        use_in_menu,
        stock,
        description,
        price,
        price_with_discount
      });

      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  updateProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const { enabled, name, slug, use_in_menu, stock, description, price, price_with_discount } = req.body;

      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      await product.update({
        enabled,
        name,
        slug,
        use_in_menu,
        stock,
        description,
        price,
        price_with_discount
      });

      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      await product.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar produto" });
    }
  };
}

module.exports = ProductController;