const StudentAccount = require("../models/studentAccount.model");
const Permission = require("../models/permission.model");
const bcrypt = require("bcrypt");

// Lấy tất cả tài khoản học sinh
exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await StudentAccount.findAll(
      {
      include: [{ model: Permission, as: "permission" }]
    });
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tạo tài khoản học sinh mới
exports.createAccount = async (req, res) => {
  try {
    const {username, password, id_quyen } = req.body;

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAccount = await StudentAccount.create({
      username,
      password: hashedPassword,
      id_quyen
    });


    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật tài khoản học sinh
exports.updateAccount = async (req, res) => {
  try {
    const { id_hocsinh, username, password, id_quyen } = req.body;
    const { id } = req.params;

    const account = await StudentAccount.findByPk(id);
    if (!account) return res.status(404).json({ message: "Tài khoản không tồn tại" });

    const hashedPassword = password ? await bcrypt.hash(password, 10) : account.password;

    await account.update({
      id_hocsinh,
      username,
      password: hashedPassword,
      id_quyen
    });

    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa tài khoản học sinh
exports.deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await StudentAccount.findByPk(id);
    if (!account) return res.status(404).json({ message: "Tài khoản không tồn tại" });

    await account.destroy();
    res.status(200).json({ message: "Xóa tài khoản thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
