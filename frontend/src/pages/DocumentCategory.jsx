import React, { useEffect, useState } from "react";
import axios from "axios";
import DataForm from '../components/ui/DataForm';
import DataTable from "../components/ui/DataTable";


const DocumentCategory = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategories, setEditingCategories] = useState(null);
  const [formData, setFormData] = useState({});
  
  
  const columnMapping = {
    id: 'STT',
    ten_dm_hoso: 'Tên danh mục'
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/document-categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Lỗi không lấy được dữ liệu danh mục thu", error);
    }
  };


  const fields = [
    { name: 'ten_dm_hoso', label: 'Loại hồ sơ', required: true}
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isDuplicate = categories.some(
      (categorie) => 
        categories.ten_dm_hoso.trim().toLowerCase() === formData.ten_dm_hoso.trim().toLowerCase() &&
        (!setEditingCategories || categorie.id !== setEditingCategories.id) 
    );
    if (isDuplicate) {
      alert("Tên loại hồ sơ đã tồn tại. Vui lòng nhập tên khác.");
      return;
    }

    if (editingCategories) {
      await axios.put(`/api/document-categories/${editingSchool.id}`, formData);
    } else {
      await axios.post('/api/document-categories', formData);
    }
    setEditingCategories(null);
    setFormData({});
    fetchCategories();
  };

  const handleEdit = async (category) => {
    setEditingCategories(category);
    setFormData(category);
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



  const handleDelete = async (id) => {
    if (window.confirm('Xác nhận xóa loại hồ sơ này?')) {
      await axios.delete(`/api/document-categories/${id}`);
      fetchCategories();
    }
  };

  return (
    <div style={{ paddingRight: '16px' }}>
      <h2>Quản lý loại hồ sơ</h2>

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

export default DocumentCategory;
