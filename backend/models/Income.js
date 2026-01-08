const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  source: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  date: { type: Date, required: true },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Income", IncomeSchema);
