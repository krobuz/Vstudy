const express = require('express');
const router = express.Router();
const thuHsController = require('./thuHs.controller');

// 📌 API lấy danh sách khoản thu
router.get('/', thuHsController.getAllThuHs);

// 📌 API lấy chi tiết khoản thu
router.get('/:id', thuHsController.getThuHsById);

// 📌 API tạo khoản thu mới
router.post('/', thuHsController.createThuHs);

// 📌 API cập nhật khoản thu
router.put('/:id', thuHsController.updateThuHs);

// 📌 API xóa khoản thu
router.delete('/:id', thuHsController.deleteThuHs);

module.exports = router;
