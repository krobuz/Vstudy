const Permission  = require('../models/permission.model');

// Lấy tất cả quyền
exports.getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    res.status(200).json(permissions);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};

// Thêm quyền mới
exports.createPermission = async (req, res) => {
  const { ten_quyen } = req.body;

  try {
    const permission = await Permission.create({ ten_quyen });
    res.status(201).json(permission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Sửa quyền
exports.updatePermission = async (req, res) => {
  const { id } = req.params;
  const { ten_quyen } = req.body;

  try {
    const permission = await Permission.findByPk(id);

    if (!permission) {
      return res.status(404).json({ message: 'Quyền không tồn tại' });
    }

    permission.ten_quyen = ten_quyen;
    await permission.save();
    res.status(200).json(permission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa quyền
exports.deletePermission = async (req, res) => {
  const { id } = req.params;

  try {
    const permission = await Permission.findByPk(id);

    if (!permission) {
      return res.status(404).json({ message: 'Quyền không tồn tại' });
    }

    await permission.destroy();
    res.status(200).json({ message: 'Quyền đã được xóa' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
