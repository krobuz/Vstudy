const app = require("./app"); // Import app đã cấu hình
const sequelize = require("./config/database"); // Kết nối database

const PORT = process.env.PORT || 5000;

// Kết nối database và khởi động server
sequelize.sync({ alter: true }).then(() => {
  console.log("✅ Database đã đồng bộ!");
  app.listen(PORT, () => console.log(`🚀 Server đang chạy trên cổng ${PORT}`));
});
