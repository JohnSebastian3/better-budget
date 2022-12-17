import express from "express";
const router = express.Router();
const dashboardController = require("../controllers/dashboard");

router.get("/", dashboardController.getDashboard);
router.post('/addTransaction', dashboardController.createTransaction);

module.exports = router;