import React, { useState } from 'react';
import Section from '../components/ui/Section';
import Input from '../components/ui/Input';
import SearchBar from '../components/ui/SearchBar';
import Table from '../components/ui/Table';
import Tabs from '../components/ui/Tabs';
import './DocumentManagement.css';

const DocumentManagement = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const tabs = [
    { id: 'basic', label: 'Thông tin cơ bản' },
    { id: 'documents', label: 'Giấy tờ gốc' },
    { id: 'certification', label: 'Công chứng' }
  ];

  const students = [
    {
      id: 'E03372108',
      name: 'Nguyễn Bá Du',
      dob: '22/08/2006',
      gender: 'Nam',
      status: 'Hoàn thiện'
    },
    // Add more students as needed
  ];

  const renderBasicInfo = () => {
    const student = {
      name: 'Nguyễn Bá Du',
      dob: '22/08/2006',
      gender: 'Nam',
      province: 'Hải Phòng',
      district: 'Thủy Nguyên',
      address: 'Thôn 6, Xã Gia Đức',
      email: 'nguyenbadulop9@gmail.com',
      phone: '0936522823',
      father: {
        name: 'Nguyễn Bá Duy',
        relation: 'Bố',
        phone: '0936606378',
        idType: 'Sổ Hàn'
      },
      mother: {
        name: 'Đỗ Thị Luyến',
        relation: 'Mẹ',
        phone: '0936815176'
      }
    };

    return (
      <div className="basic-info">
        <h3>Thông tin liên hệ</h3>
        <div className="info-grid">
          <Input label="Họ và tên" value={student.name} readOnly />
          <Input label="Ngày sinh" value={student.dob} readOnly />
          <Input label="Giới tính" value={student.gender} readOnly />
          <Input label="Tỉnh thành" value={student.province} readOnly />
          <Input label="Quận huyện" value={student.district} readOnly />
          <Input label="Địa chỉ chi tiết" value={student.address} readOnly />
          <Input label="Email" value={student.email} readOnly />
          <Input label="SĐT" value={student.phone} readOnly />
        </div>

        <h3>Người thân</h3>
        <div className="info-grid">
          <Input label="Họ và tên" value={student.father.name} readOnly />
          <Input label="Quan hệ" value={student.father.relation} readOnly />
          <Input label="SĐT" value={student.father.phone} readOnly />
          <Input label="Loại sổ TK" value={student.father.idType} readOnly />
          
          <Input label="Họ và tên" value={student.mother.name} readOnly />
          <Input label="Quan hệ" value={student.mother.relation} readOnly />
          <Input label="SĐT" value={student.mother.phone} readOnly />
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

  return (
    <div className="document-management">
      <Section title="Hồ sơ học sinh">
        <div className="document-layout">
          <div className="student-list">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Nhập tên học sinh/mã visa..."
            />
            <div className="student-items">
              {students.map(student => (
                <div 
                  key={student.id}
                  className={`student-item ${selectedStudent?.id === student.id ? 'selected' : ''}`}
                  onClick={() => setSelectedStudent(student)}
                >
                  <div className="student-info">
                    <div className="student-name">{student.name} - {student.id}</div>
                    <div className="student-details">
                      {student.dob} - {student.gender}
                    </div>
                  </div>
                  <span className={`status ${student.status.toLowerCase()}`}>
                    {student.status}
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

export default DocumentManagement; 