const express = require("express");

const app = express();
app.use(express.json()); // Middleware để parse JSON

// Import routes
const documentCategoryRoutes = require("./features/document_manage/document_categories/documentCategory.route");

// Sử dụng routes
app.use("/api/document-categories", documentCategoryRoutes);

module.exports = app;
