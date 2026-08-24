const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g. "Basic", "Premium"
    price: { type: Number, required: true },
    durationInMonths: { type: Number, required: true },
    description: { type: String },
    features: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Membership", membershipSchema);
