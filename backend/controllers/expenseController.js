const Expense = require("../models/Expense");

// TEMP until authentication is implemented
const getUserId = (req) => req.userId || "TEMP_USER_ID";

/* GET all expenses */
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: getUserId(req) })
      .sort({ date: -1 });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
};

/* CREATE expense */
exports.createExpense = async (req, res) => {
  try {
    const { amount, description, date, categoryId, notes } = req.body;

    if (!amount || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const expense = await Expense.create({
      userId: getUserId(req),
      amount,
      description,
      date,
      categoryId,
      notes
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Failed to create expense" });
  }
};

/* UPDATE expense */
exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: getUserId(req) },
      req.body,
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Failed to update expense" });
  }
};

/* DELETE expense */
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: getUserId(req)
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete expense" });
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(expense);
  } catch (err) {
    console.error("GET EXPENSE BY ID ERROR:", err);
    res.status(500).json({ message: "Failed to get expense" });
  }
};
