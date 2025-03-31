const express = require("express");

const app = express();
app.use(express.json()); // Middleware để parse JSON

// Import routes
const documentCategoryRoutes = require("./features/document_manage/document_categories/documentCategory.route");
const truongHqRoutes = require("./features/school_manage/school_categories/truongHq.route");
const dmThuRoutes = require("./features/dm_thu/dmThu.route");
// Sử dụng routes
app.use("/api/document-categories", documentCategoryRoutes);
app.use("/api/school-categories", truongHqRoutes);
app.use("/api/dm-thu", dmThuRoutes);
module.exports = app;
