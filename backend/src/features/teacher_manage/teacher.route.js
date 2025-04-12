const express = require("express");
const router = express.Router();
const teacherController = require("./teacher.controller");

router.get("/", teacherController.getAllTeachers);       // Lấy danh sách giáo viên
router.get("/:id", teacherController.getTeacherById);    // Lấy giáo viên theo ID
router.post("/", teacherController.createTeacher);       // Thêm giáo viên mới
router.put("/:id", teacherController.updateTeacher);     // Cập nhật giáo viên
router.delete("/:id", teacherController.deleteTeacher);  // Xóa giáo viên

module.exports = router;
