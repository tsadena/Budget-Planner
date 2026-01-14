const Income = require("../models/Income");
const Expense = require("../models/Expense");


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
    const incomeTransactions = incomes.map((item) => ({
      type: "income",

      title: item.title || item.source || "Income",
      amount: item.amount,
      date: item.date || item.createdAt,
    }));

    const expenseTransactions = expenses.map((item) => ({
      type: "expense",
      
      title: item.title || item.description || "Expense",
      amount: item.amount,
      date: item.date || item.createdAt,
    }));

    const transactions = [...incomeTransactions, ...expenseTransactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    res.status(200).json(transactions);
  } catch (error) {
    console.error("getRecentTransactions error:", error);
    res.status(500).json({ message: "Failed to fetch recent transactions" });
  }
};



// GET /api/dashboard/monthly
const getMonthlySummary = async (req, res) => {
  try {
    const userId = req.userId || null; // replace with real auth later

    
    const incomeAgg = await Income.aggregate([
      {
        $group: {
          _id: { month: { $month: "$date" }, year: { $year: "$date" } },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    const expenseAgg = await Expense.aggregate([
      {
        $group: {
          _id: { month: { $month: "$date" }, year: { $year: "$date" } },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);


    const monthsMap = new Map();

    function monthKey(m) { return `${m._id.year}-${String(m._id.month).padStart(2,"0")}`; }

    incomeAgg.forEach(i => {
      monthsMap.set(monthKey(i), { monthIdx: i._id.month, year: i._id.year, income: i.total, expenses: 0 });
    });
    expenseAgg.forEach(e => {
      const k = monthKey(e);
      const existing = monthsMap.get(k);
      if (existing) existing.expenses = e.total;
      else monthsMap.set(k, { monthIdx: e._id.month, year: e._id.year, income: 0, expenses: e.total });
    });

    const months = Array.from(monthsMap.values())
      .sort((a,b) => (a.year - b.year) || (a.monthIdx - b.monthIdx))
      .map(m => {
        const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        return { month: monthNames[m.monthIdx-1], income: m.income || 0, expenses: m.expenses || 0 };
      });

    res.json(months);
  } catch (err) {
    console.error("getMonthlySummary error:", err);
    res.status(500).json({ message: "Failed to fetch monthly summary" });
  }
};

module.exports = {
  getSummary,
  getRecentTransactions,
  getMonthlySummary
};
