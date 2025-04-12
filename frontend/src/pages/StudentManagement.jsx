import React, { useState, useEffect } from "react";
import api from '../utils/axios';
import Section from '../components/ui/Section';
import Input from '../components/ui/Input';
import SearchBar from '../components/ui/SearchBar';
import Table from '../components/ui/Table';
import Tabs from '../components/ui/Tabs';
import "./StudentManagement.css";

const StudentManagement = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = [
    { id: 'basic', label: 'Thông tin cơ bản' },
    { id: 'documents', label: 'Giấy tờ gốc' },
    { id: 'certification', label: 'Công chứng' }
  ];

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await api.get("/students/");
      setStudents(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (student) => {
    // Create a custom prompt dialog
    const result = await new Promise((resolve) => {
      const dialog = document.createElement('dialog');
      dialog.style.padding = '20px';
      dialog.style.borderRadius = '8px';
      dialog.style.border = '1px solid #ccc';
      
      const promptDiv = document.createElement('div');
      promptDiv.innerHTML = `
        <h2 style="margin-bottom: 15px;">Edit Student Information</h2>
        <div style="display: grid; gap: 10px;">
          <div>
            <label>Họ và tên:</label>
            <input type="text" id="studentName" value="${student.ten_hs}" style="width: 100%; padding: 5px;">
          </div>
          <div>
            <label>Ngày sinh:</label>
            <input type="date" id="dob" value="${new Date(student.dob).toISOString().split('T')[0]}" style="width: 100%; padding: 5px;">
          </div>
          <div>
            <label>Giới tính:</label>
            <select id="gender" style="width: 100%; padding: 5px;">
              <option value="Nam" ${student.gioitinh === 'Nam' ? 'selected' : ''}>Nam</option>
              <option value="Nữ" ${student.gioitinh === 'Nữ' ? 'selected' : ''}>Nữ</option>
            </select>
          </div>
          <div>
            <label>Tỉnh thành:</label>
            <input type="text" id="province" value="${student.ten_tinhthanh}" style="width: 100%; padding: 5px;">
          </div>
          <div>
            <label>Quận huyện:</label>
            <input type="text" id="district" value="${student.ten_quanhuyen}" style="width: 100%; padding: 5px;">
          </div>
          <div>
            <label>Địa chỉ chi tiết:</label>
            <input type="text" id="address" value="${student.diachi_chitiet}" style="width: 100%; padding: 5px;">
          </div>
          <div>
            <label>Email:</label>
            <input type="email" id="email" value="${student.email}" style="width: 100%; padding: 5px;">
          </div>
          <div>
            <label>SĐT:</label>
            <input type="tel" id="phone" value="${student.sdt}" style="width: 100%; padding: 5px;">
          </div>
        </div>
      `;
      
      dialog.appendChild(promptDiv);
      
      const buttonDiv = document.createElement('div');
      buttonDiv.style.marginTop = '15px';
      buttonDiv.style.textAlign = 'right';
      
      const cancelButton = document.createElement('button');
      cancelButton.textContent = 'Cancel';
      cancelButton.style.marginRight = '10px';
      cancelButton.onclick = () => {
        dialog.close();
        resolve(null);
      };
      
      const okButton = document.createElement('button');
      okButton.textContent = 'OK';
      okButton.onclick = () => {
        const newData = {
          ten_hs: document.getElementById('studentName').value,
          dob: document.getElementById('dob').value,
          gioitinh: document.getElementById('gender').value,
          ten_tinhthanh: document.getElementById('province').value,
          ten_quanhuyen: document.getElementById('district').value,
          diachi_chitiet: document.getElementById('address').value,
          email: document.getElementById('email').value,
          sdt: document.getElementById('phone').value
        };
        dialog.close();
        resolve(newData);
      };
      
      buttonDiv.appendChild(cancelButton);
      buttonDiv.appendChild(okButton);
      dialog.appendChild(buttonDiv);
      
      document.body.appendChild(dialog);
      dialog.showModal();
      
      dialog.onclose = () => {
        document.body.removeChild(dialog);
      };
    });

    if (!result) return; // User clicked Cancel

    try {
      const response = await api.put(`/students/${student.id}/`, result);
      setStudents(students.map(s => s.id === student.id ? response.data : s));
      if (selectedStudent?.id === student.id) {
        setSelectedStudent(response.data);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    try {
      await api.delete(`/students/${id}/`);
      setStudents(students.filter((student) => student.id !== id));
      if (selectedStudent?.id === id) {
        setSelectedStudent(null);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const renderBasicInfo = () => {
    if (!selectedStudent) return null;

    return (
      <div className="basic-info">
        <h3>Thông tin liên hệ</h3>
        <div className="info-grid">
          <Input label="Họ và tên" value={selectedStudent.ten_hs} readOnly />
          <Input label="Ngày sinh" value={new Date(selectedStudent.dob).toLocaleDateString('vi-VN')} readOnly />
          <Input label="Giới tính" value={selectedStudent.gioitinh} readOnly />
          <Input label="Tỉnh thành" value={selectedStudent.ten_tinhthanh} readOnly />
          <Input label="Quận huyện" value={selectedStudent.ten_quanhuyen} readOnly />
          <Input label="Địa chỉ chi tiết" value={selectedStudent.diachi_chitiet} readOnly />
          <Input label="Email" value={selectedStudent.email} readOnly />
          <Input label="SĐT" value={selectedStudent.sdt} readOnly />
        </div>
      </div>
    );
  };

  const renderDocuments = () => {
    const documents = [
      { id: 1, name: 'Bằng/CNTN', images: [null], note: 'Bằng' },
      { id: 2, name: 'Học bạ', images: [null] },
      { id: 3, name: 'Hộ chiếu', images: [null] },
      { id: 4, name: 'Ảnh 3.5 x 4.5', images: [null, null, null] },
      { id: 5, name: 'Ảnh 4 x 6', images: [null, null, null] }
    ];

    return (
      <Table
        columns={[
          { key: 'id', title: 'STT', style: { width: '60px' } },
          { key: 'name', title: 'Danh mục' },
          { 
            key: 'images', 
            title: 'Ảnh',
            render: (images) => (
              <div className="image-upload-list">
                {images.map((_, index) => (
                  <div key={index} className="image-upload-placeholder">
                    <span>+</span>
                  </div>
                ))}
              </div>
            )
          },
          { key: 'note', title: 'Ghi chú' }
        ]}
        data={documents}
      />
    );
  };

  const renderCertification = () => {
    const certifications = [
      { id: 1, name: 'GKS HS', images: [null, null] },
      { id: 2, name: 'CCCD HS', images: [null, null] },
      { id: 3, name: 'CCCD Bố', images: [null, null] },
      { id: 4, name: 'CCCD Mẹ', images: [null, null] },
      { id: 5, name: 'Sổ đỏ', images: [null, null, null] }
    ];

    return (
      <Table
        columns={[
          { key: 'id', title: 'STT', style: { width: '60px' } },
          { key: 'name', title: 'Danh mục' },
          { 
            key: 'images', 
            title: 'Ảnh',
            render: (images) => (
              <div className="image-upload-list">
                {images.map((_, index) => (
                  <div key={index} className="image-upload-placeholder">
                    <span>+</span>
                  </div>
                ))}
              </div>
            )
          },
          { key: 'note', title: 'Ghi chú' }
        ]}
        data={certifications}
      />
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="student-management">
      <Section title="Hồ sơ học sinh">
        <div className="document-layout">
          <div className="student-list">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Nhập tên học sinh/mã visa..."
            />
            <div className="student-items">
              {students
                .filter(student => 
                  student.ten_hs.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  student.sdt.includes(searchTerm)
                )
                .map(student => (
                  <div 
                    key={student.id}
                    className={`student-item ${selectedStudent?.id === student.id ? 'selected' : ''}`}
                    onClick={() => setSelectedStudent(student)}
                  >
                    <div className="student-info">
                      <div className="student-name">{student.ten_hs}</div>
                      <div className="student-details">
                        {new Date(student.dob).toLocaleDateString('vi-VN')} - {student.gioitinh}
                      </div>
                    </div>
                    <span className="status hoàn thiện">
                      Hoàn thiện
                    </span>
                  </div>
                ))}
            </div>
          </div>
          
          <div className="document-content">
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            <div className="tab-content">
              {activeTab === 'basic' && renderBasicInfo()}
              {activeTab === 'documents' && renderDocuments()}
              {activeTab === 'certification' && renderCertification()}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default StudentManagement;