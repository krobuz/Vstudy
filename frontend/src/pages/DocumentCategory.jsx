import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../components/ui/DataTable";
import ActionButtons from "../components/ui/ActionButtons";
import InputField from "../components/ui/InputField";

const DocumentCategory = () => {
  const [categories, setCategories] = useState([]);
  const [inputValue, setInputValue] = useState("");
  
  const columnMapping = {
    id: 'Mã',
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
      console.error("Error fetching categories", error);
    }
  };

  const handleAdd = async () => {
    if (!inputValue.trim()) return;
    try {
      const response = await axios.post("/api/document-categories", { ten_dm_hoso: inputValue });
      setCategories([...categories, response.data]);
      setInputValue("");
    } catch (error) {
      console.error("Error adding category", error);
    }
  };

  const handleEdit = async (category) => {
    const newName = prompt("Enter new name", category.ten_dm_hoso);
    if (!newName || newName === category.ten_dm_hoso) return;
    try {
      await axios.put(`/api/document-categories/${category.id}`, { ten_dm_hoso: newName });
      setCategories(categories.map(cat => cat.id === category.id ? { ...cat, ten_dm_hoso: newName } : cat));
    } catch (error) {
      console.error("Error updating category", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`/api/document-categories/${id}`);
      setCategories(categories.filter(cat => cat.id !== id));
    } catch (error) {
      console.error("Error deleting category", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Quản lý danh mục</h2>
      <div className="mb-4 flex">
        <InputField value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Tên danh mục..." />
        <ActionButtons onAdd={handleAdd} />
      </div>
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
