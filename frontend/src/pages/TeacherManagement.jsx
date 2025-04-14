import React, { useState, useEffect } from 'react';
import api from '../utils/axios';
import DataTable from "../components/ui/DataTable";
import DataForm from "../components/ui/DataForm";
import dayjs from 'dayjs';
import './TeacherManagement.css';

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({});
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const columnMapping = {
    id: 'Mã',
    ten_giaovien: 'Họ và tên',
    dob: 'Ngày sinh',
    gioitinh: 'Giới tính',
    sdt: 'Số điện thoại',
    email: 'Email'
  };

  const fields = [
    { name: 'ten_giaovien', label: 'Tên giáo viên', required: true },
    { name: 'dob', label: 'Ngày sinh', type: 'date', required: true },
    {
      name: 'gioitinh', label: 'Giới tính', type: 'select', required: true,
      options: [
        { label: 'Nam', value: 'Nam' },
        { label: 'Nữ', value: 'Nữ' },
      ]
    },
    { name: 'sdt', label: 'Số điện thoại', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
  ];

  const fetchTeachers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/teachers/");
      setTeachers(response.data);
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu giáo viên", err);
      setError(err.response?.data?.error || "Không thể tải danh sách giáo viên.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.ten_giaovien || !formData.dob || !formData.sdt || !formData.email) {
      return alert("Vui lòng điền đầy đủ thông tin.");
    }

    try {
      if (editingTeacher) {
        const res = await api.put(`/teachers/${editingTeacher.id}/`, formData);
        setTeachers(teachers.map(t => t.id === editingTeacher.id ? res.data : t));
      } else {
        const res = await api.post("/teachers/", formData);
        setTeachers([...teachers, res.data]);
      }

      setFormData({});
      setEditingTeacher(null);
    } catch (err) {
      console.error("Lỗi khi lưu giáo viên:", err);
      setError(err.response?.data?.error || "Không thể lưu giáo viên.");
    }
  };

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setFormData({
      ...teacher,
      dob: dayjs(teacher.dob).format('YYYY-MM-DD')
    });
  };

  const handleCancelEdit = () => {
    setEditingTeacher(null);
    setFormData({});
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa giáo viên này?")) return;
    try {
      await api.delete(`/teachers/${id}/`);
      setTeachers(teachers.filter(t => t.id !== id));
    } catch (err) {
      console.error("Lỗi khi xóa giáo viên:", err);
      setError(err.response?.data?.error || "Không thể xóa giáo viên.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="teacher-management">
      <h2>Quản lý giáo viên</h2>
      {error && <div className="error-message">{error}</div>}

      <DataForm
        fields={fields}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancelEdit}
        editingItem={editingTeacher}
      />

      <div style={{ marginTop: "20px" }}>
        <h3>Danh sách giáo viên:</h3>
        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <DataTable
            data={teachers}
            onEdit={handleEdit}
            onDelete={handleDelete}
            columnMapping={columnMapping}
          />
        )}
      </div>
    </div>
  );
};

export default TeacherManagement;
