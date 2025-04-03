const ThuHs = require('./thuHs.model');
const DmThu = require("../dm_thu/dmThu.model");
const HocSinh = require('../../models/student.model');
const { Op, Sequelize } = require('sequelize');

// Lấy danh sách các khoản thu
exports.getAllThuHs = async (req, res) => {
  try {
    const thuHs = await ThuHs.findAll({
      attributes: [
        'id', 
        'id_hocsinh', 
        [Sequelize.col('hoc_sinh.ten_hs'), 'ten_hs'],  // Lấy tên học sinh từ bảng HocSinh
        [Sequelize.col('loai_thu.loai_thu'), 'loai_thu'],  // Lấy loại thu từ bảng DmThu
        'noi_dung', 
        'so_tien', 
        'ngay_thu',
      ],
      include: [
        { model: HocSinh, as: 'hoc_sinh', attributes: [] },
        { model: DmThu, as: 'loai_thu', attributes: [] } 
      ],
      order: [['ngay_thu', 'DESC']]
    });

    res.json(thuHs);
  } catch (error) {
    // console.log(error)
    res.status(500).json({ error: error.message });
  }
};

// Lấy chi tiết một khoản thu
exports.getThuHsById = async (req, res) => {
  try {
    const thuHs = await ThuHs.findByPk(req.params.id, {
      include: [
        { model: DmThu, as: 'loai_thu', attributes: ['loai_thu'] },
        { model: HocSinh, as: 'hoc_sinh', attributes: ['ten_hs'] }
      ]
    });

    if (!thuHs) return res.status(404).json({ message: "Khoản thu không tồn tại" });

    res.json(thuHs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm khoản thu mới
exports.createThuHs = async (req, res) => {
  try {

    const { id_dm_thu, id_hocsinh, noi_dung, so_tien, ngay_thu } = req.body;
    // Kiểm tra xem loại thu và học sinh có tồn tại không
    const dmThu = await DmThu.findByPk(id_dm_thu);
    const hocSinh = await HocSinh.findOne({ where: { id_hocsinh } });

    if (!dmThu || !hocSinh) return res.status(404).json({ message: "Loại thu hoặc học sinh không tồn tại" });
    
    const newThu = await ThuHs.create({ id_dm_thu, id_hocsinh, noi_dung, so_tien, ngay_thu });
    
    res.status(201).json(newThu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật khoản thu
exports.updateThuHs = async (req, res) => {
  try {
    const thuHs = await ThuHs.findByPk(req.params.id);
    if (!thuHs) return res.status(404).json({ message: "Khoản thu không tồn tại" });

    await thuHs.update(req.body);
    res.json(thuHs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa khoản thu
exports.deleteThuHs = async (req, res) => {
  try {
    const thuHs = await ThuHs.findByPk(req.params.id);
    if (!thuHs) return res.status(404).json({ message: "Khoản thu không tồn tại" });

    await thuHs.destroy();
    res.json({ message: "Đã xóa khoản thu" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
