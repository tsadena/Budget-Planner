// pseudo-code using mongoose aggregation
const userId = mongoose.Types.ObjectId(req.user.id);
const start = new Date("2025-01-01");
const end = new Date("2025-12-31");

const incomeAgg = await Income.aggregate([
  { $match: { userId, date: { $gte: start, $lte: end } } },
  { $group: { _id: { year: { $year: "$date" }, month: { $month: "$date" } }, total: { $sum: "$amount" } } }
]);

const expenseAgg = await Expense.aggregate([
  { $match: { userId, date: { $gte: start, $lte: end } } },
  { $group: { _id: { year: { $year: "$date" }, month: { $month: "$date" } }, total: { $sum: "$amount" } } }
]);


// merge results into month-by-month structure in your controller



const breakdown = await Expense.aggregate([
  { $match: { userId, date: { $gte: start, $lte: end } } },
  { $group: { _id: "$categoryId", total: { $sum: "$amount" } } },
  { $lookup: { from: "categories", localField: "_id", foreignField: "_id", as: "category" } },
  { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
  { $project: { _id: 0, categoryId: "$_id", categoryName: "$category.name", total: 1 } },
  { $sort: { total: -1 } }
]);




const totals = await Income.aggregate([
  { $match: { userId } },
  { $group: { _id: null, totalIncome: { $sum: "$amount" } } }
]);

const totals2 = await Expense.aggregate([
  { $match: { userId } },
  { $group: { _id: null, totalExpense: { $sum: "$amount" } } }
]);

// easier: run two aggregates in parallel (Promise.all)


// How frontend will call the income tracker 
fetch("/api/income", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    source: "Salary",
    amount: 5000,
    date: "2026-01-01"
  })
});
