import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import SchoolManagement from "./pages/SchoolManagement";
import SemesterManagement from "./pages/SemesterManagement";
import DocumentCategory from "./pages/DocumentCategory";
import TeacherManagement from "./pages/TeacherManagement";
import RevenueCategoryManagement from "./pages/RevenueCategoryManagement";
import StudentManagement from "./pages/StudentManagement";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<div>Dashboard</div>} />
            <Route path="/schools" element={<SchoolManagement />} />
            <Route path="/semesters" element={<SemesterManagement />} />
            <Route path="/document-types" element={<DocumentCategory />} />
            <Route path="/students" element={<StudentManagement />} />
            <Route path="/teachers" element={<TeacherManagement />} />
            <Route path="/revenue-categories" element={<RevenueCategoryManagement />} />
            <Route path="/finance" element={<div>Finance Management</div>} />
            <Route path="/statistics" element={<div>Statistics</div>} />
            <Route path="/account" element={<div>Account Settings</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
