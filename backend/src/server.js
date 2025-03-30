require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Kiểm tra kết nối
db.connect(err => {
    if (err) {
        console.error('Lỗi kết nối database:', err);
    } else {
        console.log('Kết nối database thành công!');
    }
});

app.get('/api/data', (req, res) => {
    const sql = `SELECT u.id, u.ten_truong_hq AS university, u.korean_name AS uni_korean, 
                    p.ten_thanhpho AS province, p.korean_name AS province_korean, u.xep_hang
                FROM truong_hq u
                JOIN thanhpho_hq p ON u.id_thanhpho = p.id
                ORDER BY p.id, u.xep_hang;`;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

app.listen(5000, () => console.log('Backend chạy trên cổng 5000'));
