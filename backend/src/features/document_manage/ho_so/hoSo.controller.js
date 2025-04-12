const HoSo = require('./hoSo.model');
const BoHoso = require('../document_set/documentSet.model');
const DmHoso = require('../document_categories/documentCategory.model');

// Lấy tất cả các hồ sơ
exports.getAllHoSo = async (req, res) => {
  try {
    const hoSos = await HoSo.findAll({
      include: [
        { model: BoHoso, as: 'bo_hoso', attributes: ['ten_bo_hoso'] },
        { model: DmHoso, as: 'dm_hoso', attributes: ['ten_dm_hoso'] },
      ],
      order: [['id', 'ASC']],
    });
    res.json(hoSos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy chi tiết hồ sơ theo id
exports.getHoSoById = async (req, res) => {
  try {
    const hoSo = await HoSo.findByPk(req.params.id, {
      include: [
        { model: BoHoso, as: 'bo_hoso', attributes: ['ten_bo_hoso'] },
        { model: DmHoso, as: 'dm_hoso', attributes: ['ten_dm_hoso'] },
      ],
    });

    if (!hoSo) return res.status(404).json({ message: "Hồ sơ không tồn tại" });

    res.json(hoSo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thêm hồ sơ mới
exports.createHoSo = async (req, res) => {
  try {
    const { id_bo_hoso, id_dm_hoso, link, index_trang } = req.body;

    // Kiểm tra xem bo_hoso và dm_hoso có tồn tại không
    const boHoso = await BoHoso.findByPk(id_bo_hoso);
    const dmHoso = await DmHoso.findByPk(id_dm_hoso);
    if (!boHoso || !dmHoso) return res.status(404).json({ message: "Hồ sơ không tồn tại" });

    const newHoSo = await HoSo.create({ id_bo_hoso, id_dm_hoso, link, index_trang });
    res.status(201).json(newHoSo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật hồ sơ
exports.updateHoSo = async (req, res) => {
  try {
    const hoSo = await HoSo.findByPk(req.params.id);
    if (!hoSo) return res.status(404).json({ message: "Hồ sơ không tồn tại" });

    await hoSo.update(req.body);
    res.json(hoSo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa hồ sơ
exports.deleteHoSo = async (req, res) => {
  try {
    const hoSo = await HoSo.findByPk(req.params.id);
    if (!hoSo) return res.status(404).json({ message: "Hồ sơ không tồn tại" });

    await hoSo.destroy();
    res.json({ message: "Đã xóa hồ sơ" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
