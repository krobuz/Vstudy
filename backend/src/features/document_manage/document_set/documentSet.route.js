const express = require('express');
const router = express.Router();
const boHosoController = require('./documentSet.controller');

// API lấy tất cả hồ sơ
router.get('/', boHosoController.getAllBoHoso);

// API lấy hồ sơ theo id
router.get('/:id', boHosoController.getBoHosoById);

// API thêm hồ sơ
router.post('/', boHosoController.createBoHoso);

// API cập nhật hồ sơ
router.put('/:id', boHosoController.updateBoHoso);

// API xóa hồ sơ
router.delete('/:id', boHosoController.deleteBoHoso);

module.exports = router;
