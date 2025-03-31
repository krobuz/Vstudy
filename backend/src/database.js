require("dotenv").config({ path: "../.env" });
// console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME);

const mysql = require("mysql2");

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
};

const pool = mysql.createPool(dbConfig);

function connectWithRetry() {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error("❌ Lỗi kết nối database. Đang thử lại trong 5s...");
            console.error(err);

      setTimeout(connectWithRetry, 5000);
    } else {
      console.log("✅ Kết nối database thành công!");
      connection.release();
    }
  });
}

connectWithRetry();
module.exports = pool;
