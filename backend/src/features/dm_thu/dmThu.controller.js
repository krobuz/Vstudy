const DmThu = require("./dmThu.model");

// Lấy tất cả các loại thu
exports.getAllDmThu = async (req, res) => {
  try {
    const dmThu = await DmThu.findAll();
    res.json(dmThu);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu dm_thu:", error);
    res.status(500).json({ error: "Lỗi server khi lấy dữ liệu" });
  }
};

// Lấy loại thu theo ID
exports.getDmThuById = async (req, res) => {
  try {
    const dmThu = await DmThu.findByPk(req.params.id);
    if (!dmThu) {
      return res.status(404).json({ error: "Loại thu không tồn tại" });
    }
    res.json(dmThu);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu dm_thu theo ID:", error);
    res.status(500).json({ error: "Lỗi server khi lấy dữ liệu theo ID" });
  }
};

// Tạo loại thu mới
exports.createDmThu = async (req, res) => {
  try {
    const { loai_thu } = req.body;
    const newDmThu = await DmThu.create({ loai_thu });
    res.status(201).json(newDmThu);
  } catch (error) {
    console.error("Lỗi khi tạo loại thu:", error);
    res.status(500).json({ error: "Lỗi server khi tạo loại thu" });
  }
};

// Cập nhật loại thu
exports.updateDmThu = async (req, res) => {
  try {
    const { loai_thu } = req.body;
    const dmThu = await DmThu.findByPk(req.params.id);
    if (!dmThu) {
      return res.status(404).json({ error: "Loại thu không tồn tại" });
    }
    dmThu.loai_thu = loai_thu;
    await dmThu.save();
    res.json(dmThu);
  } catch (error) {
    console.error("Lỗi khi cập nhật loại thu:", error);
    res.status(500).json({ error: "Lỗi server khi cập nhật loại thu" });
  }
};

// Xóa loại thu theo ID
exports.deleteDmThu = async (req, res) => {
  try {
    const dmThu = await DmThu.findByPk(req.params.id);
    if (!dmThu) {
      return res.status(404).json({ error: "Loại thu không tồn tại" });
    }
    await dmThu.destroy();
    res.json({ message: "Loại thu đã bị xóa" });
  } catch (error) {
    console.error("Lỗi khi xóa loại thu:", error);
    res.status(500).json({ error: "Lỗi server khi xóa loại thu" });
  }
};
