const mysql = require("mysql2");

const dbConfig = {
  host: process.env.DB_HOST || "mysql",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "42069",
  database: process.env.DB_NAME || "quanlyduhoc",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(dbConfig);

function connectWithRetry() {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("❌ Lỗi kết nối database. Đang thử lại trong 5s...");
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log("✅ Kết nối database thành công!");
      connection.release();
    }
  });
}

connectWithRetry();

module.exports = pool;
