const express = require('express');
const router = express.Router();
const hoSoController = require('./hoSo.controller');

// API lấy tất cả hồ sơ
router.get('/', hoSoController.getAllHoSo);

// API lấy hồ sơ theo id
router.get('/:id', hoSoController.getHoSoById);

// API thêm hồ sơ
router.post('/', hoSoController.createHoSo);

// API cập nhật hồ sơ
router.put('/:id', hoSoController.updateHoSo);

// API xóa hồ sơ
router.delete('/:id', hoSoController.deleteHoSo);

module.exports = router;
