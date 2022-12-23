import express from "express";
const router = express.Router();
const dashboardController = require("../controllers/dashboard");

router.get("/", dashboardController.getDashboard);
router.get('/subcategories/:category', dashboardController.getSubcategories);
router.post('/addTransaction', dashboardController.addTransaction);
router.post('/addCategory', dashboardController.addCategory);
router.post('/addSubcategory/:category', dashboardController.addSubcategory)

module.exports = router;