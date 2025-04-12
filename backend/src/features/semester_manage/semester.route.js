const express = require("express");
const router = express.Router();
const semesterController = require("./semester.controller");

router.get("/", semesterController.getAllSemesters);       // Lấy danh sách học kỳ
router.get("/:id", semesterController.getSemesterById);    // Lấy học kỳ theo ID
router.post("/", semesterController.createSemester);       // Thêm học kỳ mới
router.put("/:id", semesterController.updateSemester);     // Cập nhật học kỳ
router.delete("/:id", semesterController.deleteSemester);  // Xóa học kỳ

module.exports = router;
