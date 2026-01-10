const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  amount: { type: Number, required: true, min: 0 },
  description: { type: String },
  date: { type: Date, required: true },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Expense", ExpenseSchema);
