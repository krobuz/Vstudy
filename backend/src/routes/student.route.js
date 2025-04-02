// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');

// Lấy tất cả học sinh
router.get('/', studentController.getAllStudents);

// Lấy học sinh theo id
router.get('/:id', studentController.getStudentById);

// Thêm học sinh mới
router.post('/', studentController.createStudent);

// Cập nhật thông tin học sinh
router.put('/:id', studentController.updateStudent);

// Xóa học sinh
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
