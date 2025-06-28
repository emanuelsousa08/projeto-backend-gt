const Category = require('../models/Category');

class CategoryController {
  getAllCategories = async (req, res) => {
    try {
      const limitParam = parseInt(req.query.limit) ?? 12;
      const page = parseInt(req.query.page) ?? 1;
      const fields = req.query.fields ? req.query.fields.split(',') : ['id', 'name', 'slug', 'use_in_menu'];
      const useInMenu = req.query.use_in_menu;

      const limit = limitParam === -1 ? null : limitParam;
      const offset = limit ? (page - 1) * limit : null;

      const where = {};
      if (useInMenu !== undefined) {
        if (useInMenu === 'true') where.use_in_menu = true;
        else if (useInMenu === 'false') where.use_in_menu = false;
        else return res.status(400).json({ message: 'use_in_menu deve ser true ou false' });
      }

      const total = await Category.count({ where });

      const data = await Category.findAll({
        where,
        attributes: fields,
        ...(limit && { limit }),
        ...(offset && { offset })
      });

      return res.status(200).json({
        data,
        total,
        limit: limitParam,
        page
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
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