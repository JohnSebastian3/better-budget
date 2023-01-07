import express from "express";
const router = express.Router();
const dashboardController = require("../controllers/dashboard");

router.get("/", dashboardController.getDashboard);
router.post('/addTransaction', dashboardController.addTransaction);
router.post('/addCategory', dashboardController.addCategory);
router.post('/addSubcategory/:category', dashboardController.addSubcategory);
router.post('/createBudget', dashboardController.createBudget);
router.put('/setSubcategoryBudget/:category/:subcategory/:year/:month', dashboardController.setSubcategoryBudget);
router.delete('/deleteSubcategory/:category/:subcategory/:month/:year/:day', dashboardController.deleteSubcategory);
router.delete('/deleteCategory/:category/:month/:year/:day', dashboardController.deleteCategory);
module.exports = router;