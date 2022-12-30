import express from "express";
const router = express.Router();
const dashboardController = require("../controllers/dashboard");

router.get("/", dashboardController.getDashboard);
router.post('/addTransaction', dashboardController.addTransaction);
router.post('/addCategory', dashboardController.addCategory);
router.post('/addSubcategory/:category', dashboardController.addSubcategory);
router.put('/setSubcategoryBudget/:category/:subcategory', dashboardController.setSubcategoryBudget);
router.delete('/deleteSubcategory/:category/:subcategory', dashboardController.deleteSubcategory);
router.delete('/deleteCategory/:category', dashboardController.deleteCategory);
module.exports = router;