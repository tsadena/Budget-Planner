const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true }, // e.g., "Family Wallet", "Cash", "Bank"
  currency: { type: String, default: "ETB" },
  // Cached balance is optional. Recommended: compute balance on demand or update via transactions.
  cachedBalance: { type: Number, default: 0 },
  isPrimary: { type: Boolean, default: false }
}, { timestamps: true });

WalletSchema.index({ userId: 1 });

module.exports = mongoose.model("Wallet", WalletSchema);
