import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';


const Sidebar = () => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState({
    training: false,
    blog: false,
    category: false
  });

  const toggleExpand = (item) => {
    setExpandedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h1 className="logo">VStudy</h1>
      </div>
      <ul className="sidebar-nav">
        <li>
          <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
            <span className="icon"></span>
            <span>Trang chủ</span>
          </Link>
        </li>
        <li>
          <div 
            className={`nav-item ${expandedItems.category ? 'expanded' : ''}`}
            onClick={() => toggleExpand('category')}
          >
            <span className="icon"></span>
            <span>Quản lý danh mục</span>
            <span className="arrow">▼</span>
          </div>
          {expandedItems.category && (
            <ul className="sub-menu">
              <li>
                <Link 
                  to="/schools" 
                  className={`nav-item ${isActive('/schools') ? 'active' : ''}`}
                >
                  <span>Trường học</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/semesters" 
                  className={`nav-item ${isActive('/semesters') ? 'active' : ''}`}
                >
                  <span>Kỳ học</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/document-types" 
                  className={`nav-item ${isActive('/document-types') ? 'active' : ''}`}
                >
                  <span>Loại hồ sơ</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/revenue-categories" 
                  className={`nav-item ${isActive('/revenue-categories') ? 'active' : ''}`}
                >
                  <span>Loại thu</span>
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <div 
            className={`nav-item ${expandedItems.training ? 'expanded' : ''}`}
            onClick={() => toggleExpand('training')}
          >
            <span className="icon"></span>
            <span>Quản lý đào tạo</span>
            <span className="arrow">▼</span>
          </div>
          {expandedItems.training && (
            <ul className="sub-menu">
              <li>
                <Link 
                  to="/students" 
                  className={`nav-item ${isActive('/students') ? 'active' : ''}`}
                >
                  <span>Học sinh</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/teachers" 
                  className={`nav-item ${isActive('/teachers') ? 'active' : ''}`}
                >
                  <span>Giáo viên</span>
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <div 
            className={`nav-item ${expandedItems.blog ? 'expanded' : ''}`}
            onClick={() => toggleExpand('blog')}
          >
            <span className="icon"></span>
            <span>Quản lý blog</span>
            <span className="arrow">▼</span>
          </div>
        </li>
        <li>
          <Link to="/finance" className={`nav-item ${isActive('/finance') ? 'active' : ''}`}>
            <span className="icon"></span>
            <span>Thu Chi</span>
          </Link>
        </li>
        <li>
          <Link to="/statistics" className={`nav-item ${isActive('/statistics') ? 'active' : ''}`}>
            <span className="icon"></span>
            <span>Báo cáo thống kê</span>
          </Link>
        </li>
        <li>
          <Link to="/account" className={`nav-item ${isActive('/account') ? 'active' : ''}`}>
            <span className="icon"></span>
            <span>Tài khoản</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
