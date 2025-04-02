const express = require('express');
const router = express.Router();
const truongHqController = require('./truongHq.controller');

// API lấy tất cả trường học Hàn Quốc
router.get('/', truongHqController.getAllTruongHq);

// API tạo trường học Hàn Quốc
router.post('/', truongHqController.createTruongHq);

// API cập nhật trường học Hàn Quốc
router.put('/:id', truongHqController.updateTruongHq);

// API xoá trường học Hàn Quốc
router.delete('/:id', truongHqController.deleteTruongHq);
module.exports = router;
