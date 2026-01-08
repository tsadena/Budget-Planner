const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: false },
  walletId: { type: mongoose.Schema.Types.ObjectId, ref: "Wallet", required: false },
  name: { type: String },
  limitAmount: { type: Number, required: true, min: 0 },
  period: { type: String, enum: ["monthly", "weekly", "yearly"], default: "monthly" },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: false }
}, { timestamps: true });

module.exports = mongoose.model("Budget", BudgetSchema);
