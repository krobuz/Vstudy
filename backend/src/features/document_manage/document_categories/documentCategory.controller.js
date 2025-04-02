const DocumentCategory = require("./documentCategory.model");

// Lấy danh sách tất cả loại hồ sơ
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await DocumentCategory.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy một loại hồ sơ theo ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await DocumentCategory.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Loại hồ sơ không tồn tại" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tạo loại hồ sơ mới
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await DocumentCategory.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật loại hồ sơ
exports.updateCategory = async (req, res) => {
  try {
    const category = await DocumentCategory.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Loại hồ sơ không tồn tại" });

    await category.update(req.body);
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa loại hồ sơ
exports.deleteCategory = async (req, res) => {
  try {
    const category = await DocumentCategory.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Loại hồ sơ không tồn tại" });

    await category.destroy();
    res.json({ message: "Đã xóa loại hồ sơ" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
