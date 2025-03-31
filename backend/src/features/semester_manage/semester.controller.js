const Semester = require("./semester.model");

// 📌 Lấy danh sách học kỳ
exports.getAllSemesters = async (req, res) => {
  try {
    const semesters = await Semester.findAll();
    res.json(semesters);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy danh sách học kỳ" });
  }
};

// 📌 Lấy học kỳ theo ID
exports.getSemesterById = async (req, res) => {
  try {
    const { id } = req.params;
    const semester = await Semester.findByPk(id);
    
    if (!semester) {
      return res.status(404).json({ error: "Học kỳ không tồn tại" });
    }

    res.json(semester);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy học kỳ theo ID" });
  }
};

// 📌 Thêm mới học kỳ
exports.createSemester = async (req, res) => {
  try {
    const { ten_kyhoc, ngaybd, ngaykt } = req.body;
    if (!ten_kyhoc || !ngaybd || !ngaykt) {
      return res.status(400).json({ error: "Thiếu thông tin học kỳ" });
    }

    const newSemester = await Semester.create({ ten_kyhoc, ngaybd, ngaykt });
    res.status(201).json(newSemester);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi tạo học kỳ" });
  }
};

// 📌 Cập nhật học kỳ
exports.updateSemester = async (req, res) => {
  try {
    const { id } = req.params;
    const { ten_kyhoc, ngaybd, ngaykt } = req.body;

    const semester = await Semester.findByPk(id);
    if (!semester) {
      return res.status(404).json({ error: "Học kỳ không tồn tại" });
    }

    semester.ten_kyhoc = ten_kyhoc;
    semester.ngaybd = ngaybd;
    semester.ngaykt = ngaykt;
    await semester.save();

    res.json(semester);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi cập nhật học kỳ" });
  }
};

// 📌 Xóa học kỳ
exports.deleteSemester = async (req, res) => {
  try {
    const { id } = req.params;

    const semester = await Semester.findByPk(id);
    if (!semester) {
      return res.status(404).json({ error: "Học kỳ không tồn tại" });
    }

    await semester.destroy();
    res.json({ message: "Xóa học kỳ thành công!" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi xóa học kỳ" });
  }
};
