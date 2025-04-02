const BoHoso = require('./documentSet.model');
const HocSinh = require('../../../models/student.model');

// 📌 Lấy tất cả các hồ sơ
exports.getAllBoHoso = async (req, res) => {
  try {
    const boHosos = await BoHoso.findAll({
      include: [{ model: HocSinh, as: 'hoc_sinh', attributes: ['ten_hs'] }],
      order: [['ngay_tao', 'DESC']],
    });
    res.json(boHosos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Lấy chi tiết hồ sơ theo id
exports.getBoHosoById = async (req, res) => {
  try {
    const boHoso = await BoHoso.findByPk(req.params.id, {
      include: [{ model: HocSinh, as: 'hoc_sinh', attributes: ['ten_hs'] }],
    });

    if (!boHoso) return res.status(404).json({ message: "Hồ sơ không tồn tại" });
    
    res.json(boHoso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Thêm hồ sơ mới
exports.createBoHoso = async (req, res) => {
  try {
    const { id_hocsinh, ten_bo_hoso, status } = req.body;

    // Kiểm tra xem học sinh có tồn tại không
    const hocSinh = await HocSinh.findByPk(id_hocsinh);
    if (!hocSinh) return res.status(404).json({ message: "Học sinh không tồn tại" });

    const newBoHoso = await BoHoso.create({ id_hocsinh, ten_bo_hoso, status });
    res.status(201).json(newBoHoso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Cập nhật hồ sơ
exports.updateBoHoso = async (req, res) => {
  try {
    const boHoso = await BoHoso.findByPk(req.params.id);
    if (!boHoso) return res.status(404).json({ message: "Hồ sơ không tồn tại" });

    await boHoso.update(req.body);
    res.json(boHoso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Xóa hồ sơ
exports.deleteBoHoso = async (req, res) => {
  try {
    const boHoso = await BoHoso.findByPk(req.params.id);
    if (!boHoso) return res.status(404).json({ message: "Hồ sơ không tồn tại" });

    await boHoso.destroy();
    res.json({ message: "Đã xóa hồ sơ" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
