const express = require("express");
const Membership = require("../models/Membership");
const User = require("../models/User");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// @route  GET /api/memberships  (list all plans - public)
router.get("/", async (req, res) => {
  try {
    const plans = await Membership.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route  POST /api/memberships  (admin: create a plan)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { name, price, durationInMonths, description, features } = req.body;
    const plan = await Membership.create({
      name,
      price,
      durationInMonths,
      description,
      features,
    });
    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route  POST /api/memberships/select/:id  (member chooses a plan)
router.post("/select/:id", protect, async (req, res) => {
  try {
    const plan = await Membership.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    const user = await User.findById(req.user.id);
    user.membership = plan._id;
    await user.save();

    res.json({ message: "Membership plan selected", membership: plan });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
