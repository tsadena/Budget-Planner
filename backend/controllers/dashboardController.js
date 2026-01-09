const Income = require("../models/Income");
const Expense = require("../models/Expense");

// GET /api/dashboard/summary
const getSummary = async (req, res) => {
  try {
    const totalIncomeAgg = await Income.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpenseAgg = await Expense.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalIncome = totalIncomeAgg[0]?.total || 0;
    const totalExpenses = totalExpenseAgg[0]?.total || 0;

    res.status(200).json({
      totalIncome,
      totalExpenses,
      totalBalance: totalIncome - totalExpenses,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard summary" });
  }
};

// GET /api/dashboard/recent
const getRecentTransactions = async (req, res) => {
  try {
    const incomes = await Income.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const expenses = await Expense.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const transactions = [
      ...incomes.map((i) => ({
        type: "income",
        title: i.title,
        amount: i.amount,
        date: i.createdAt,
      })),
      ...expenses.map((e) => ({
        type: "expense",
        title: e.title,
        amount: e.amount,
        date: e.createdAt,
      })),
    ]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recent transactions" });
  }
};

module.exports = {
  getSummary,
  getRecentTransactions,
};
