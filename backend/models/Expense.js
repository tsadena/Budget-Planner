const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  walletId: { type: mongoose.Schema.Types.ObjectId, ref: "Wallet", required: false },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: false },
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: "FamilyMember", required: false }, // if you track family members
  amount: { type: Number, required: true, min: 0 },
  description: { type: String },
  date: { type: Date, required: true },
  recurrence: { type: String, enum: ["none","daily","weekly","monthly","yearly"], default: "none" },
  metadata: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

ExpenseSchema.index({ userId: 1, date: -1 });
ExpenseSchema.index({ userId: 1, categoryId: 1 });

module.exports = mongoose.model("Expense", ExpenseSchema);
