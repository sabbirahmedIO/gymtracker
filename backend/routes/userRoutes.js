const express = require("express");
const User = require("../models/User");
const { protect } = require("../middleware/auth");

const router = express.Router();

// @route  PUT /api/users/profile  (update own profile: name, height, weight)
router.put("/profile", protect, async (req, res) => {
  try {
    const { name, height, weight } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name !== undefined) user.name = name;
    if (height !== undefined) user.height = height;
    if (weight !== undefined) user.weight = weight;

    await user.save();
    const { password, ...safeUser } = user.toObject();
    res.json(safeUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
