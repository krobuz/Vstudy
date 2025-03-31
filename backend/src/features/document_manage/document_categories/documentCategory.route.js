const express = require("express");
const router = express.Router();
const documentCategoryController = require("./documentCategory.controller");

router.get("/", documentCategoryController.getAllCategories);      // Lấy danh sách loại hồ sơ
router.get("/:id", documentCategoryController.getCategoryById);   // Lấy loại hồ sơ theo ID
router.post("/", documentCategoryController.createCategory);      // Tạo loại hồ sơ
router.put("/:id", documentCategoryController.updateCategory);    // Cập nhật loại hồ sơ
router.delete("/:id", documentCategoryController.deleteCategory); // Xóa loại hồ sơ

module.exports = router;
