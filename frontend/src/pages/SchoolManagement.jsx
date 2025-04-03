import React, { useState, useEffect } from 'react';
import api from '../utils/axios';
import DataTable from "../components/ui/DataTable";
import ActionButtons from "../components/ui/ActionButtons";
import InputField from "../components/ui/InputField";



const SchoolManagement = () => {
  const [schoolName, setSchoolName] = useState("");
  const [koreanName, setKoreanName] = useState("");
  const [cityId, setCityId] = useState("");
  const [rank, setRank] = useState(1);
  const [schools, setSchools] = useState([]);
  const [editingSchool, setEditingSchool] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const columnMapping = {
    id: 'Mã',
    ten_truong_hq: 'Tên trường',
    korean_name: 'Tên tiếng Hàn',
    ten_thanhpho: 'Thành phố',
    xep_hang: 'Xếp hạng'
  };

  // Danh sách các thành phố cứng
  const cities = [
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

  
  const fetchSchools = async () => {
    setLoading(true);
      setError(null);
      try {
        const response = await api.get("/school-categories/");
        setSchools(response.data);
      } catch (error) {
        console.error("Error fetching schools", error);
        setError(error.response?.data?.error || "Failed to fetch schools");
      } finally {
        setLoading(false);
      }
    };
    
    useEffect(() => {
      fetchSchools();
    }, []);
    
  const handleAdd = async () => {
    if (!schoolName.trim() || !koreanName.trim() || !cityId || !rank) return;

    setError(null);
    try {
      const response = await api.post("/school-categories/", {
        ten_truong_hq: schoolName,
        korean_name: koreanName,
        id_thanhpho: cityId,
        xep_hang: rank,
      });
      setSchools([...schools, response.data]);
      setSchoolName("");
      setKoreanName("");
      setCityId("");
      setRank(1);
    } catch (error) {
      console.error("Error adding school", error);
      setError(error.response?.data?.error || "Failed to add school");
    }
  };

  const handleEdit = (school) => {
    setEditingSchool(school);
    setSchoolName(school.ten_truong_hq);
    setKoreanName(school.korean_name);
    setCityId(school.id_thanhpho);
    setRank(school.xep_hang);
    fetchSchools();
  };


  const handleUpdate = async () => {
    if (!editingSchool) return;
  
    try {
      const response = await api.put(`/school-categories/${editingSchool.id}/`, {
        ten_truong_hq: schoolName,
        korean_name: koreanName,
        id_thanhpho: cityId,
        xep_hang: rank,
      });
  
      // Tạo một bản sao mới của danh sách trường
      const updatedSchools = schools.map(s =>
        s.id === editingSchool.id ? { ...s, ...response.data } : s
      );
  
      setSchools(updatedSchools);  // Cập nhật state với danh sách mới
      setEditingSchool(null);
      setSchoolName("");
      setKoreanName("");
      setCityId("");
      setRank(1);
    } catch (error) {
      console.error("Lỗi cập nhật trường học", error);
      setError(error.response?.data?.error || "Không thể cập nhật trường học");
    }
  };

  // const handleEdit = async (school) => {
  //   const newSchoolName = prompt("Nhập tên trường:", school.ten_truong_hq);
  //   if (!newSchoolName || newSchoolName === school.ten_truong_hq) return;
  
  //   const newKoreanName = prompt("Nhập tên tiếng Hàn:", school.korean_name);
  //   if (!newKoreanName || newKoreanName === school.korean_name) return;

  //   const cityId = prompt("Nhập mã thành phố (ID):", school.id_thanhpho);
  //   if (!cityId || isNaN(cityId)) return;

  //   const newRank = prompt("Nhập xếp hạng (số):", school.xep_hang);
  //   if (!newRank || isNaN(newRank)) return;
  //   if (!newKoreanName || !newCity || !newRank) return;
  
  //   try {
  //     const response = await api.put(`/schools/${school.id}/`, {
  //       ten_truong_hq: newSchoolName,
  //       korean_name: newKoreanName,
  //       ten_thanhpho: newCity,
  //       xep_hang: newRank,
  //     });
  
  //     setSchools(schools.map(s => s.id === school.id ? response.data : s));
  //   } catch (error) {
  //     console.error("Lỗi cập nhật trường học", error);
  //     setError(error.response?.data?.error || "Không thể cập nhật trường học");
  //   }
  // };


  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa trường học này?")) return;

    try {
      await api.delete(`/school-categories/${id}`);
      setSchools(schools.filter(school => school.id !== id));
    } catch (error) {
      console.error("Error deleting school", error);
      setError(error.response?.data?.error || "Failed to delete school");
    }
  };

  return (
    <div className="school-management">
      <h2 className="text-xl font-bold mb-4">Quản lý trường học</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="form-row">
        <InputField
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
          placeholder="Nhập tên trường"
        />
        <InputField
          value={koreanName}
          onChange={(e) => setKoreanName(e.target.value)}
          placeholder="Tên Hàn Quốc"
        />
        <select value={cityId} onChange={(e) => setCityId(e.target.value)}>
          <option value="">Chọn thành phố</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
        <select value={rank} onChange={(e) => setRank(e.target.value)}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>

        {editingSchool ? (
          <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">
            Lưu
          </button>
        ) : (
          <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded">
            Thêm
          </button>
        )}
      </div>


      <div>
        <h3 className="text-lg font-semibold mb-2">Danh sách trường học:</h3>
        {loading ? (
          <p className="text-gray-500">Đang tải...</p>
        ) : (
          <DataTable
            data={schools}
            onEdit={handleEdit}
            onDelete={handleDelete}
            columnMapping={columnMapping}
          />
        )}
      </div>


    </div>
  );
};


export default SchoolManagement; 