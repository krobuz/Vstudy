const express = require("express");

const app = express();
app.use(express.json()); // Middleware để parse JSON

// Import routes
const documentCategoryRoutes = require("./features/document_manage/document_categories/documentCategory.route");
const semesterCategoryRoutes = require("./features/semester_manage/semester.route");
const teacherRoutes = require("./features/teacher_manage/teacher.route");

// Sử dụng routes
app.use("/api/document-categories", documentCategoryRoutes);
app.use("/api/semesters", semesterCategoryRoutes);
app.use("/api/teachers", teacherRoutes);
module.exports = app;

