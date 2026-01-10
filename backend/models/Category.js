const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, // null or absent => global
  name: { type: String, required: true, trim: true },
  type: { type: String, enum: ["income","expense","both"], default: "expense" },
  icon: { type: String },   // optional icon name or URL
  color: { type: String },  // optional color hex
  isDefault: { type: Boolean, default: false } // default system categories
}, { timestamps: true });

CategorySchema.index({ userId: 1, name: 1 }, { unique: true, partialFilterExpression: { userId: { $exists: true } } });

module.exports = mongoose.model("Category", CategorySchema);
