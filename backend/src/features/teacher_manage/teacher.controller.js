const Teacher = require("./teacher.model");

// 📌 Lấy danh sách giáo viên
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.findAll();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy danh sách giáo viên" });
  }
};

// 📌 Lấy giáo viên theo ID
exports.getTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findByPk(id);

    if (!teacher) {
      return res.status(404).json({ error: "Giáo viên không tồn tại" });
    }

    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy giáo viên theo ID" });
  }
};

// 📌 Thêm giáo viên mới
exports.createTeacher = async (req, res) => {
  try {
    const { ten_giaovien, dob, gioitinh, sdt, email } = req.body;

    if (!ten_giaovien || !email) {
      return res.status(400).json({ error: "Tên giáo viên và email là bắt buộc" });
    }

    const newTeacher = await Teacher.create({ ten_giaovien, dob, gioitinh, sdt, email });
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi tạo giáo viên" });
  }
};

// 📌 Cập nhật thông tin giáo viên
exports.updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { ten_giaovien, dob, gioitinh, sdt, email } = req.body;

    const teacher = await Teacher.findByPk(id);
    if (!teacher) {
      return res.status(404).json({ error: "Giáo viên không tồn tại" });
    }

    teacher.ten_giaovien = ten_giaovien;
    teacher.dob = dob;
    teacher.gioitinh = gioitinh;
    teacher.sdt = sdt;
    teacher.email = email;
    await teacher.save();

    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi cập nhật giáo viên" });
  }
};

// 📌 Xóa giáo viên
exports.deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findByPk(id);
    if (!teacher) {
      return res.status(404).json({ error: "Giáo viên không tồn tại" });
    }

    await teacher.destroy();
    res.json({ message: "Xóa giáo viên thành công!" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi xóa giáo viên" });
  }
};
