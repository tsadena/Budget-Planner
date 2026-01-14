const express = require("express");
const router = express.Router();

const {
  getSummary,
  getRecentTransactions,
  getMonthlySummary
} = require("../controllers/dashboardController");

router.get("/summary", getSummary);
router.get("/recent", getRecentTransactions);
router.get("/monthly", getMonthlySummary);

module.exports = router;
