const express = require("express");
const router = express.Router();
const dmThuController = require("./dmThu.controller");

router.get("/", dmThuController.getAllDmThu);
router.get("/:id", dmThuController.getDmThuById);
router.post("/", dmThuController.createDmThu);
router.put("/:id", dmThuController.updateDmThu);
router.delete("/:id", dmThuController.deleteDmThu);

module.exports = router;
