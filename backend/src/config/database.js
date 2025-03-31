require("dotenv").config({ path: "../.env" });
const { Sequelize } = require("sequelize");

// Tạo kết nối Sequelize với MySQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  port: 3306,
  pool: {
    max: 10, // Số kết nối tối đa trong pool
    min: 0,  // Số kết nối tối thiểu
    acquire: 30000, // Thời gian tối đa để lấy kết nối (ms)
    idle: 10000,    // Thời gian tối đa giữ kết nối không hoạt động (ms)
  },
  logging: false, // Tắt log SQL để console không bị spam
});

// Hàm kiểm tra kết nối
async function connectWithRetry() {
  try {
    await sequelize.authenticate();
    console.log("✅ Kết nối database thành công!");
  } catch (err) {
    console.error("❌ Lỗi kết nối database. Đang thử lại trong 5s...");
    console.error(err);
    setTimeout(connectWithRetry, 5000);
  }
}

// Gọi kết nối
connectWithRetry();

module.exports = sequelize;
