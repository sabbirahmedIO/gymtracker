// Run with: node seed/seedMemberships.js
// Populates the database with a few starter membership plans so the
// Membership page has real data to display during testing/demo.
require("dotenv").config();
const mongoose = require("mongoose");
const Membership = require("../models/Membership");

const plans = [
  {
    name: "Basic",
    price: 20,
    durationInMonths: 1,
    description: "Access to gym floor and cardio equipment.",
    features: ["Gym floor access", "Cardio equipment", "Locker room"],
  },
  {
    name: "Standard",
    price: 45,
    durationInMonths: 3,
    description: "Everything in Basic plus group classes.",
    features: ["Gym floor access", "Group classes", "Locker room", "Free towel service"],
  },
  {
    name: "Premium",
    price: 120,
    durationInMonths: 12,
    description: "Full access with personal training sessions.",
    features: ["All Standard features", "2 PT sessions/month", "Priority booking"],
  },
];

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Membership.deleteMany({});
  await Membership.insertMany(plans);
  console.log("Membership plans seeded successfully");
  process.exit();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
