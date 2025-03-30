import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/data")
            .then(response => setUsers(response.data))
            .catch(error => console.error("Lỗi gọi API:", error));
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-4">Quản Lý Học Sinh</h1>
        </div>
    );
}

export default App;
