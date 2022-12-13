import express from "express";
const router = express.Router();
const dashboardController = require("../controllers/dashboard");

router.get("/", dashboardController.getDashboard);
router.post('/addExpense', dashboardController.createExpense);

module.exports = router;