const TruongHq = require("./truongHq.model");
const ThanhPhoHq = require("./thanhphoHq.model");

// Lấy tất cả trường học Hàn Quốc và thông tin thành phố Hàn Quốc
exports.getAllTruongHq = async (req, res) => {
  try {
    const schools = await TruongHq.findAll()
    
    res.json(schools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tạo trường học mới với thông tin thành phố
exports.createTruongHq = async (req, res) => {
  try {
    const { ten_truong_hq, korean_name, id_thanhpho, xep_hang } = req.body;
    console.log(req.body);
    // Kiểm tra xem thành phố có tồn tại không
    const city = await ThanhPhoHq.findByPk(id_thanhpho);
    if (!city) return res.status(404).json({ message: "Thành phố không tồn tại" });

    // Tạo trường học mới
    const newSchool = await TruongHq.create({ 
      ten_truong_hq, 
      korean_name, 
      id_thanhpho, 
      xep_hang 
    });

    // Trả về trường học mới kèm thông tin thành phố
    const schoolWithCity = await newSchool.reload({ 
      include: { model: ThanhPhoHq, as: "city" } // Thêm alias 'city' vào include
    });
    res.status(201).json(schoolWithCity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Cập nhật trường học 
exports.updateTruongHq = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ URL
    const { ten_truong_hq, korean_name, id_thanhpho, xep_hang } = req.body;

    // Kiểm tra xem trường có tồn tại không
    const school = await TruongHq.findByPk(id);
    if (!school) return res.status(404).json({ message: "Trường học không tồn tại" });

    // Kiểm tra xem thành phố có tồn tại không
    if (id_thanhpho) {
      const city = await ThanhPhoHq.findByPk(id_thanhpho);
      if (!city) return res.status(404).json({ message: "Thành phố không tồn tại" });
    }

    // Cập nhật thông tin trường học
    await school.update({ ten_truong_hq, korean_name, id_thanhpho, xep_hang });

    // Lấy dữ liệu mới sau khi cập nhật
    const updatedSchool = await school.reload({
      include: { model: ThanhPhoHq, as: "city" }
    });

    res.json(updatedSchool);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xoá trường học
exports.deleteTruongHq = async (req, res) => {
  try {
    const { id } = req.params;

    // Kiểm tra xem trường có tồn tại không
    const school = await TruongHq.findByPk(id);
    if (!school) return res.status(404).json({ message: "Trường học không tồn tại" });

    // Xoá trường học
    await school.destroy();

    res.json({ message: "Trường học đã bị xoá thành công" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


