const express = require("express");
const router = express.Router();
const {
  getAllIncome,
  createIncome,
  updateIncome,
  deleteIncome
} = require("../controllers/incomeController");

router.get("/", getAllIncome);
router.post("/", createIncome);
router.put("/:id", updateIncome);
router.delete("/:id", deleteIncome);

module.exports = router;
