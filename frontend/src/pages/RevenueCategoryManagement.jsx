import React, { useState, useEffect } from "react";
import api from '../utils/axios';
import DataTable from "../components/ui/DataTable";
import InputField from "../components/ui/InputField";
import "./RevenueCategoryManagement.css";

const RevenueCategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const columnMapping = {
    id: 'Mã',
    loai_thu: 'Loại thu'
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/dm-thu/");
      setCategories(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!newCategory.trim()) {
      alert("Please enter a category name");
      return;
    }

    try {
      const response = await api.post("/dm-thu/", {
        loai_thu: newCategory
      });
      setCategories([...categories, response.data]);
      setNewCategory("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = async (category) => {
    const newName = prompt("Enter new category name:", category.loai_thu);
    if (newName === null || newName.trim() === "") return;

    try {
      const response = await api.put(`/dm-thu/${category.id}/`, {
        loai_thu: newName
      });
      setCategories(
        categories.map((cat) =>
          cat.id === category.id ? response.data : cat
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa mục thu?")) {
      return;
    }

    try {
      await api.delete(`/dm-thu/${id}/`);
      setCategories(categories.filter((cat) => cat.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="revenue-category-management">
      <h2 className="text-xl font-bold mb-4">Quản lý danh mục thu</h2>
      <div className="form-row">
        <InputField
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Thêm loại phí..."
        />
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2">
          Thêm
        </button>
      </div>

      <div className="table-container">
        <DataTable
          data={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
          columnMapping={columnMapping}
        />
      </div>
    </div>
  );
};

export default RevenueCategoryManagement; 