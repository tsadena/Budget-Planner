const express = require("express");
const router = express.Router();

const {
  getSummary,
  getRecentTransactions,
} = require("../controllers/dashboardController");

router.get("/summary", getSummary);
router.get("/recent", getRecentTransactions);

module.exports = router;
