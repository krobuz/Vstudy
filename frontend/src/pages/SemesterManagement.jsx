import React, { useState, useEffect } from 'react';
import axios from "axios";
import dayjs from "dayjs";
<<<<<<< HEAD
import DataForm from '../components/ui/DataForm';
import DataTable from '../components/ui/DataTable';
=======
import DataTable from "../components/ui/DataTable";
import ActionButtons from "../components/ui/ActionButtons";
import InputField from "../components/ui/InputField";
import DateInputField from '../components/ui/DateInputField';
// import ErrorBoundary from "../components/ErrorBoundary"; 

>>>>>>> develop


const SemesterManagement = () => {
  const [semesters, setSemesters] = useState([]);
<<<<<<< HEAD
  const [editingSemesters, setEditingSemesters] = useState(null);
  const [formData, setFormData] = useState({});
=======
  const [semesterName, setSemesterName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchSemesters();
  }, []);

  const convertDateToISO = (date) => {
    const [day, month, year] = date.split('/');
    return dayjs(`${year}-${month}-${day}`).format('YYYY-MM-DD');
  };
>>>>>>> develop

  const fetchSemesters = async () => {
    try {
      const response = await axios.get("/api/semesters");
      setSemesters(response.data);
    } catch (error) {
<<<<<<< HEAD
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
=======
      console.error("Error fetching semesters", error);
    }
  };

  const handleAdd = async () => {
    if (!semesterName.trim() || !startDate || !endDate) return;
    try {

      const formattedStartDate = convertDateToISO(startDate);
      const formattedEndDate = convertDateToISO(endDate);

      const response = await axios.post("/api/semesters", {
        ten_kyhoc: semesterName,
        ngaybd: formattedStartDate,
        ngaykt: formattedEndDate,
      });
      setSemesters([...semesters, response.data]);
      setSemesterName("");
      setStartDate("");
      setEndDate("");
    } catch (error) {
      console.error("Error adding semester", error);
    }
  };

  const handleEdit = async (semester) => {
    const newName = prompt("Enter new name", semester.ten_kyhoc);
    const newStartDate = prompt("Enter new start date (dd/MM/yyyy)", semester.ngaybd);
    const newEndDate = prompt("Enter new end date (dd/MM/yyyy)", semester.ngaykt);

    if (!newName || newName === semester.ten_kyhoc) return;

    try {
      await axios.put(`/api/semesters/${semester.id}`, {
        ten_kyhoc: newName,
        ngaybd: newStartDate,
        ngaykt: newEndDate,
      });
      setSemesters(
        semesters.map((sem) =>
          sem.id === semester.id ? { ...sem, ten_kyhoc: newName, ngaybd: newStartDate, ngaykt: newEndDate } : sem
        )
      );
    } catch (error) {
      console.error("Error updating semester", error);
    }
>>>>>>> develop
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`/api/semesters/${id}`);
<<<<<<< HEAD
      fetchSemesters();
=======
      setSemesters(semesters.filter(s => s.id !== id));
>>>>>>> develop
    } catch (error) {
      console.error("Error deleting semester", error);
    }
  };

  return (
<<<<<<< HEAD
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
=======
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Quản lý kì học</h2>
      <div className="mb-4 flex space-x-2">
        <InputField value={semesterName} onChange={(e) => setSemesterName(e.target.value)} placeholder="Thêm kì học..." />
        <DateInputField value={startDate} onChange={setStartDate} />
        <DateInputField value={endDate} onChange={setEndDate} />
        <ActionButtons onAdd={handleAdd} />
      </div>
      <DataTable data={semesters} onEdit={handleEdit} onDelete={handleDelete} />
>>>>>>> develop
    </div>
  );
};

<<<<<<< HEAD
=======
// const SemesterManagementPageWithErrorBoundary = () => (
//   <ErrorBoundary>
//     <SemesterManagement />
//   </ErrorBoundary>
// );
>>>>>>> develop

export default SemesterManagement;