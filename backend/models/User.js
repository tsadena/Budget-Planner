const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  profilePhoto: { type: String, default: "" },  
  role: { type: String, enum: ["user","admin"], default: "user" },
  isPremium: { type: Boolean, default: false },
  subscriptionExpiry: { type: Date, default: null },
  createdAtClient: { type: Date },
}, { timestamps: true });

UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = function(plain) {
  return bcrypt.compare(plain, this.password);
};

UserSchema.index({ email: 1 });

module.exports = mongoose.model("User", UserSchema);
