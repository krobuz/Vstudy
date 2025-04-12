import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataForm from '../components/ui/DataForm';
import DataTable from '../components/ui/DataTable';

const SchoolManagement = () => {

  const initialCities = [
    { id: 1, name: "Seoul" },
    { id: 2, name: "Busan" },
    { id: 3, name: "Incheon" },
    { id: 4, name: "Daegu" },
    { id: 5, name: "Daejeon" },
    { id: 6, name: "Gwangju" },
    { id: 7, name: "Ulsan" },
    { id: 8, name: "Suwon" },
    { id: 9, name: "Changwon" },
    { id: 10, name: "Seongnam" },
    { id: 11, name: "Goyang" },
    { id: 12, name: "Yongin" },
    { id: 13, name: "Bucheon" },
    { id: 14, name: "Ansan" },
    { id: 15, name: "Jeonju" },
    { id: 16, name: "Cheongju" },
    { id: 17, name: "Pohang" },
    { id: 18, name: "Uijeongbu" },
    { id: 19, name: "Jeju" },
    { id: 20, name: "Chuncheon" },
  ];  


  const [schools, setSchools] = useState([]);
  const [editingSchool, setEditingSchool] = useState(null);
  const [formData, setFormData] = useState({});

  // Fetch dữ liệu
  const fetchSchools = async () => {
    const res = await axios.get('/api/school-categories');
    setSchools(res.data);
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  // Trường dữ liệu dùng cho DataForm
  const fields = [
    { name: 'ten_truong_hq', label: 'Tên trường', required: true },
    { name: 'korean_name', label: 'Tên tiếng Hàn', required: true },
    {
      name: 'id_thanhpho',
      label: 'Thành phố',
      type: 'select',
      options: initialCities.map(c => ({ value: c.id, label: c.name })),
      required: true,
    },
    {
      name: 'xep_hang',
      label: 'Xếp hạng',
      type: 'select',
      options: [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
      ],
      required: true,
    },
  ];
  

  const columnMapping = {
    id: 'STT',
    ten_truong_hq: 'Tên trường',
    korean_name: 'Tên tiếng Hàn',
    ten_thanhpho: 'Thành phố',
    xep_hang: 'Xếp hạng',
  };

  // Xử lý thêm hoặc cập nhật
  const handleSubmit =  async (e) => {
    e.preventDefault();

    if (editingSchool) {
      await axios.put(`/api/school-categories/${editingSchool.id}`, formData);
    } else {
      await axios.post('/api/school-categories', formData);
    }
    setEditingSchool(null);
    setFormData({});
    fetchSchools();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Xác nhận xóa trường này?')) {
      await axios.delete(`/api/school-categories/${id}`);
      fetchSchools();
    }
  };

  const handleEdit = (item) => {
    setEditingSchool(item);
    setFormData(item);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancelEdit = () => {
    setEditingSchool(null);
    setFormData({});
  };

  return (

    <div style={{ paddingRight: '16px' }}>
      <h2>Quản lý Trường Học</h2>

      <DataForm
        fields={fields}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancelEdit}
        editingItem={editingSchool}
      />

      <DataTable
        data={schools}
        onEdit={handleEdit}
        onDelete={handleDelete}
        columnMapping={columnMapping}
      />
    </div>
  );
};

export default SchoolManagement;
