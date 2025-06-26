const Category = require('../models/Category');

class CategoryController {
  getAllCategories = async (req, res) => {
    try {
      const categories = await Category.findAll();
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao listar categorias" });
    }
  };

  getCategoryById = async (req, res) => {
    try {
      const categoryId = req.params.id;
      const category = await Category.findByPk(categoryId);

      if (!category) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }

      return res.status(200).json(category);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar categoria" });
    }
  };

  createCategory = async (req, res) => {
    try {
      const { name, slug, use_in_menu } = req.body;

      if (!name || !slug) {
        return res.status(400).json({ message: "Campos obrigatórios não preenchidos" });
      }

      const newCategory = await Category.create({
        name,
        slug,
        use_in_menu
      });

      return res.status(201).json(newCategory);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  updateCategory = async (req, res) => {
    try {
      const categoryId = req.params.id;
      const { name, slug, use_in_menu } = req.body;

      const category = await Category.findByPk(categoryId);

      if (!category) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }

      await category.update({
        name,
        slug,
        use_in_menu
      });

      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

  deleteCategory = async (req, res) => {
    try {
      const categoryId = req.params.id;
      const category = await Category.findByPk(categoryId);

      if (!category) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }

      await category.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar categoria" });
    }
  };
}

module.exports = CategoryController;