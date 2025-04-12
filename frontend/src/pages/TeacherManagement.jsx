import React, { useState, useEffect } from 'react';
import api from '../utils/axios';
import DataTable from "../components/ui/DataTable";
import ActionButtons from "../components/ui/ActionButtons";
import InputField from "../components/ui/InputField";
import DateInputField from '../components/ui/DateInputField';
import './TeacherManagement.css';

const TeacherManagement = () => {
  const [teacherName, setTeacherName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Nam");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [teachers, setTeachers] = useState([]);
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

  // Lấy danh sách giáo viên
  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("/teachers/");
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers", error);
        setError(error.response?.data?.error || "Failed to fetch teachers");
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  // Xử lý thêm giáo viên
  const handleAdd = async () => {
    if (!teacherName.trim() || !dob || !phone.trim() || !email.trim()) return;

    setError(null);
    try {
      const response = await api.post("/teachers/", {
        ten_giaovien: teacherName,
        dob: dob,
        gioitinh: gender,
        sdt: phone,
        email: email,
      });
      setTeachers([...teachers, response.data]);
      setTeacherName("");
      setDob("");
      setGender("Nam");
      setPhone("");
      setEmail("");
    } catch (error) {
      console.error("Error adding teacher", error);
      setError(error.response?.data?.error || "Failed to add teacher");
    }
  };

  // Xử lý sửa giáo viên
  const handleEdit = async (teacher) => {
    const newName = prompt("Enter new name:", teacher.ten_giaovien);
    if (!newName || newName === teacher.ten_giaovien) return;

    try {
      const response = await api.put(`/teachers/${teacher.id}/`, {
        ten_giaovien: newName,
        dob: teacher.dob,
        gioitinh: teacher.gioitinh,
        sdt: teacher.sdt,
        email: teacher.email,
      });
      setTeachers(teachers.map(t => t.id === teacher.id ? response.data : t));
    } catch (error) {
      console.error("Error updating teacher", error);
      setError(error.response?.data?.error || "Failed to update teacher");
    }
  };

  // Xử lý xóa giáo viên
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;

    try {
      await api.delete(`/teachers/${id}/`);
      setTeachers(teachers.filter(t => t.id !== id));
    } catch (error) {
      console.error("Error deleting teacher", error);
      setError(error.response?.data?.error || "Failed to delete teacher");
    }
  };

  return (
    <div className="teacher-management">
      <h2 className="text-xl font-bold mb-4">Quản lý giáo viên</h2>
      {error && <div className="error-message">{error}</div>}

      <div className="mb-4 flex space-x-2">
        <InputField 
          value={teacherName} 
          onChange={(e) => setTeacherName(e.target.value)} 
          placeholder="Tên giáo viên..." 
        />
        <DateInputField 
          value={dob} 
          onChange={setDob} 
          placeholder="dd/MM/yyyy" 
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
        <InputField 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          placeholder="Nhập số điện thoại" 
        />
        <InputField 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Enter email" 
        />
        <ActionButtons onAdd={handleAdd} />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Danh sách giáo viên:</h3>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
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