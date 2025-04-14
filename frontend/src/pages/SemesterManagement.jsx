import React, { useState, useEffect } from 'react';
import axios from "axios";
import dayjs from "dayjs";
import DataForm from '../components/ui/DataForm';
import DataTable from '../components/ui/DataTable';


const SemesterManagement = () => {
  const [semesters, setSemesters] = useState([]);
  const [editingSemesters, setEditingSemesters] = useState(null);
  const [formData, setFormData] = useState({});

  const fetchSemesters = async () => {
    try {
      const response = await axios.get("/api/semesters");
      setSemesters(response.data);
    } catch (error) {
      console.error("Lỗi không lấy được dữ liệu kì học", error);
    }
  };

  useEffect(() => {
    fetchSemesters();
  }, []);

  const FormatedDate = (data) => ({
    ...data,
    ngay_bd: dayjs(data.ngay_bd).format('YYYY-MM-DD'),
    ngay_kt: dayjs(data.ngay_kt).format('YYYY-MM-DD'),
  });


  const fields = [
    { name: 'ten_kyhoc', label: 'Kỳ học', required: true},
    { name: 'ngaybd', label: 'Ngày bắt đầu', type: 'date', required: true},
    { name: 'ngaykt', label: 'Ngày kết thúc', type: 'date', required: true},
  ];

  const columnMapping = {
    id: 'STT',
    ten_kyhoc: 'Kỳ học',
    ngaybd: 'Ngày bắt đầu',
    ngaykt: 'Ngày kết thúc'
  };

// Xử lý thêm hoặc cập nhật
  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      if (editingSemesters) {
        await axios.put(`/api/semesters/${editingSemesters.id}`, formData);
      } else {
        await axios.post('/api/semesters', formData);
      }
  
      setEditingSemesters(null);
      setFormData({});
      fetchSemesters();
    } catch (err) {
      console.error("Lỗi khi submit:", err.response?.data || err.message);
      alert("Có lỗi xảy ra khi lưu dữ liệu. Vui lòng kiểm tra lại thông tin.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const handleEdit = async (semester) => {
    setEditingSemesters(semester);
    setFormData(FormatedDate(semester));
  };

  const handleCancelEdit = () => {
    setEditingSemesters(null);
    setFormData({});
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa kì học này ?")) return;
    try {
      await axios.delete(`/api/semesters/${id}`);
      fetchSemesters();
    } catch (error) {
      console.error("Lỗi khi xóa kì học", error);
    }
  };

  return (
    <div style={{ paddingRight: '16px' }}>
      <h2>Quản lý kì học</h2>

      <DataForm
        fields={fields}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancelEdit}
        editingItem={editingSemesters}
      />

      <DataTable
        data={semesters}
        onEdit={handleEdit}
        onDelete={handleDelete}
        columnMapping={columnMapping}
      />
    </div>
  );
};


export default SemesterManagement;