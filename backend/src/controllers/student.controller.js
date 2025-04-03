const { Student, District, City, } = require('../models');
const { Sequelize } = require('sequelize');

// console.log("Student model: ", Student);
// console.log("District model: ", District);
// console.log("City model: ", City);
// console.log("StudentAccount model: ", StudentAccount);



// Lấy tất cả học sinh
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      attributes: [
        'id', 
        'ten_hs', 
        'dob', 
        'gioitinh', 
        'diachi_chitiet', 
        'email', 
        'sdt',
        [Sequelize.col('district.ten_quanhuyen'), 'ten_quanhuyen'], 
        [Sequelize.col('district.city.ten_tinhthanh'), 'ten_tinhthanh']
      ],
      include: [
        {
          model: District,
          as: 'district',
          attributes: [], 
          include: [
            {
              model: City,
              as: 'city',
              attributes: [] 
            }
          ]
        }
      ]
    });

    // console.log(students);
    res.status(200).json(students);
  } catch (error) {
    console.error("Error: ", error);  // In chi tiết lỗi
    res.status(500).json({ message: error.message });
  }
};

// Lấy thông tin học sinh theo id
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ message: 'Không tìm thấy học sinh' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Thêm học sinh mới
exports.createStudent = async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật thông tin học sinh
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      await student.update(req.body);
      res.status(200).json(student);
    } else {
      res.status(404).json({ message: 'Không tìm thấy học sinh' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa học sinh
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      await student.destroy();
      res.status(200).json({ message: 'Đã xóa học sinh' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy học sinh' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
