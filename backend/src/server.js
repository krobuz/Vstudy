// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const pool = require("./config/database"); 

// const app = express();
// app.use(cors());
// app.use(express.json());


// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });


// app.get('/api/data', (req, res) => {
//     const sql = `SELECT u.id, u.ten_truong_hq AS university, u.korean_name AS uni_korean, 
//                     p.ten_thanhpho AS province, p.korean_name AS province_korean, u.xep_hang
//                 FROM truong_hq u
//                 JOIN thanhpho_hq p ON u.id_thanhpho = p.id
//                 ORDER BY p.id, u.xep_hang;`;
//     pool.query(sql, (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         res.json(results);
//     });
// });

// app.listen(5000, () => console.log('Backend chạy trên cổng 5000'));


const app = require("./app"); // Import app đã cấu hình
const sequelize = require("./config/database"); // Kết nối database

const PORT = process.env.PORT || 5000;

// Kết nối database và khởi động server
sequelize.sync({ alter: true }).then(() => {
  console.log("✅ Database đã đồng bộ!");
  app.listen(PORT, () => console.log(`🚀 Server đang chạy trên cổng ${PORT}`));
});
