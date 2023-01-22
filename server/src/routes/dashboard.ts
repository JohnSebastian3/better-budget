import express from "express";
const router = express.Router();
const dashboardController = require("../controllers/dashboard");

router.get("/", dashboardController.getDashboard);
router.post('/addTransaction', dashboardController.addTransaction);
router.post('/addCategory', dashboardController.addCategory);
router.post('/addSubcategory/:category', dashboardController.addSubcategory);
router.post('/createBudget', dashboardController.createBudget);
router.put('/updateCategory/:category/:year/:month', dashboardController.updateCategoryTitle);
router.put('/updateSubcategory/:category/:subcategory/:year/:month', dashboardController.updateSubcategoryTitle);
router.put('/setSubcategoryBudget/:category/:subcategory/:year/:month', dashboardController.setSubcategoryBudget);
router.put('/updateTransactionTitle/:id', dashboardController.updateTransactionTitle);
router.put('/updateTransactionValue/:id', dashboardController.updateTransactionValue);
router.delete('/deleteSubcategory/:category/:subcategory/:month/:year/:day', dashboardController.deleteSubcategory);
router.delete('/deleteCategory/:category/:month/:year/:day', dashboardController.deleteCategory);
router.delete('/deleteTransaction/:id', dashboardController.deleteTransaction)
module.exports = router;