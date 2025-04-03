import React, { useState, useEffect } from 'react';
import axios from "axios";
import dayjs from "dayjs";
import DataTable from "../components/ui/DataTable";
import ActionButtons from "../components/ui/ActionButtons";
import InputField from "../components/ui/InputField";
import DateInputField from '../components/ui/DateInputField';
// import ErrorBoundary from "../components/ErrorBoundary"; 



const SemesterManagement = () => {
  const [semesters, setSemesters] = useState([]);
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

  const fetchSemesters = async () => {
    try {
      const response = await axios.get("/api/semesters");
      setSemesters(response.data);
    } catch (error) {
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
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`/api/semesters/${id}`);
      setSemesters(semesters.filter(s => s.id !== id));
    } catch (error) {
      console.error("Error deleting semester", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Quản lý kì học</h2>
      <div className="mb-4 flex space-x-2">
        <InputField value={semesterName} onChange={(e) => setSemesterName(e.target.value)} placeholder="Thêm kì học..." />
        <DateInputField value={startDate} onChange={setStartDate} />
        <DateInputField value={endDate} onChange={setEndDate} />
        <ActionButtons onAdd={handleAdd} />
      </div>
      <DataTable data={semesters} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

// const SemesterManagementPageWithErrorBoundary = () => (
//   <ErrorBoundary>
//     <SemesterManagement />
//   </ErrorBoundary>
// );

export default SemesterManagement;