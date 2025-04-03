const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // Middleware để parse JSON
app.use(express.urlencoded({ extended: true })); 

// Import routes
const permissionRoutes = require('./routes/permission.route');
const studentAccountRoutes = require("./routes/studentAccount.route");
const documentCategoryRoutes = require("./features/document_manage/document_categories/documentCategory.route");
const semesterCategoryRoutes = require("./features/semester_manage/semester.route");
const teacherRoutes = require("./features/teacher_manage/teacher.route");

const truongHqRoutes = require("./features/school_manage/school_categories/truongHq.route");
const dmThuRoutes = require("./features/dm_thu/dmThu.route");
const thuHsRoutes = require('./features/thu_hs/thuHs.route');

const studentRoutes = require('./routes/student.route');

const boHosoRouter = require('./features/document_manage/document_set/documentSet.route');
const hoSoRouter = require('./features/document_manage/ho_so/hoSo.route');

// Sử dụng routes
app.use('/api/permissions', permissionRoutes);
app.use("/api/student-accounts", studentAccountRoutes);
app.use("/api/document-categories", documentCategoryRoutes);

app.use("/api/school-categories", truongHqRoutes);
app.use("/api/dm-thu", dmThuRoutes);
app.use("/api/thu-hs", thuHsRoutes);

app.use('/api/students', studentRoutes);
app.use('/api/bo-hoso', boHosoRouter);
app.use('/api/ho-so', hoSoRouter);

app.use("/api/semesters", semesterCategoryRoutes);
app.use("/api/teachers", teacherRoutes);
module.exports = app;

