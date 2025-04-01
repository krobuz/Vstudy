const express = require("express");

const app = express();
app.use(express.json()); // Middleware để parse JSON
app.use(express.urlencoded({ extended: true })); 

// Import routes
const permissionRoutes = require('./routes/permission.route');
const studentAccountRoutes = require("./routes/studentAccount.route");
const documentCategoryRoutes = require("./features/document_manage/document_categories/documentCategory.route");
const studentRoutes = require('./routes/student.route');

// Sử dụng routes
app.use('/api/permissions', permissionRoutes);
app.use("/api/student-accounts", studentAccountRoutes);
app.use("/api/document-categories", documentCategoryRoutes);

app.use('/api/students', studentRoutes);

module.exports = app;
