const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true }, 
  currency: { type: String, default: "ETB" },
  
  cachedBalance: { type: Number, default: 0 },
  isPrimary: { type: Boolean, default: false }
}, { timestamps: true });

WalletSchema.index({ userId: 1 });

module.exports = mongoose.model("Wallet", WalletSchema);
