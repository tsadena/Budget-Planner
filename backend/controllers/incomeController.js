const Income = require("../models/Income");

// TEMP: until auth is implemented
const getUserId = (req) => req.userId || "TEMP_USER_ID";

/* GET all income */
exports.getAllIncome = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: getUserId(req) })
      .sort({ date: -1 });

    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch income" });
  }
};

/* CREATE income */
exports.createIncome = async (req, res) => {
  try {
    const { amount, source, date, categoryId, notes } = req.body;

    if (!amount || !source || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const income = await Income.create({
      userId: getUserId(req),
      amount,
      source,
      date,
      categoryId,
      notes
    });

    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({ message: "Failed to create income" });
  }
};

/* UPDATE income */
exports.updateIncome = async (req, res) => {
  try {
    const income = await Income.findOneAndUpdate(
      { _id: req.params.id, userId: getUserId(req) },
      req.body,
      { new: true }
    );

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({ message: "Failed to update income" });
  }
};

/* DELETE income */
exports.deleteIncome = async (req, res) => {
  try {
    const income = await Income.findOneAndDelete({
      _id: req.params.id,
      userId: getUserId(req)
    });

    if (!income) {
      return res.status(404).json({ message: "Income not found" });
    }

    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete income" });
  }
};
