const express = require("express");
const router = express.Router();
const studentAccountController = require("../controllers/studentAccount.controller");

router.get("/", studentAccountController.getAllAccounts);
router.post("/", studentAccountController.createAccount);
router.put("/:id", studentAccountController.updateAccount);
router.delete("/:id", studentAccountController.deleteAccount);

module.exports = router;
