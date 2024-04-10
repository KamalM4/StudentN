const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const {validateStudent}= require("../validators/admin.validator");

router.post("/admin-add-student",validateStudent, adminController.saveStudent);
router.get("/admin-view-student/:id", adminController.viewStudent);
router.get("/admin-all-student",adminController.viewAllStudent);
router.put("/admin-update-student/:id", adminController.updateStudent);
router.delete("/admin-delete-student/:id",adminController.deleteStudent);

module.exports = router;