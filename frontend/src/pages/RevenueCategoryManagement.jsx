import React, { useState, useEffect } from "react";
import axios from 'axios';
import DataTable from "../components/ui/DataTable";
import DataForm from '../components/ui/DataForm';


const RevenueCategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategories, setEditingCategories] = useState(null);
  const [formData, setFormData] = useState({});

  const fields = [
    {name: 'loai_thu', label: 'Loại thu', required: true},
  ]

  const columnMapping = {
    id: 'Mã',
    loai_thu: 'Loại thu'
  };

  
  const fetchCategories = async () => {
    const res = await axios.get('/api/dm-thu');
    setCategories(res.data);
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingCategories) {
      await axios.put(`/api/dm-thu/${editingCategories.id}`, formData);
    } else {
      await axios.post('/api/dm-thu', formData);
    }
    setEditingCategories(null);
    setFormData({});
    fetchCategories();
  };

  const handleEdit = (item) => {
    setEditingCategories(item);
    setFormData(item);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Xác nhận xóa trường này?')) {
      await axios.delete(`/api/dm-thu/${id}`);
      fetchCategories();
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancelEdit = () => {
    setEditingCategories(null);
    setFormData({});
  };


  return (
    <div style={{ paddingRight: '16px' }}>
      <h2>Quản lý Danh mục thu</h2>

    <DataForm
      fields={fields}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={handleCancelEdit}
      editingItem={editingCategories}
    />

    <DataTable
      data={categories}
      onEdit={handleEdit}
      onDelete={handleDelete}
      columnMapping={columnMapping}
    />
  </div>
  );
};

export default RevenueCategoryManagement; 