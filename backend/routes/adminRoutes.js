const express = require("express");
const User = require("../models/User");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// @route  GET /api/admin/members  (list all members)
router.get("/members", protect, adminOnly, async (req, res) => {
  try {
    const members = await User.find({ role: "member" })
      .select("-password")
      .populate("membership");
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route  PUT /api/admin/members/:id  (update a member)
router.put("/members/:id", protect, adminOnly, async (req, res) => {
  try {
    const { name, email, membership } = req.body;
    const member = await User.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });

    if (name !== undefined) member.name = name;
    if (email !== undefined) member.email = email;
    if (membership !== undefined) member.membership = membership;

    await member.save();
    const { password, ...safeUser } = member.toObject();
    res.json(safeUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route  DELETE /api/admin/members/:id  (remove an inactive member)
router.delete("/members/:id", protect, adminOnly, async (req, res) => {
  try {
    const member = await User.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Member not found" });

    await member.deleteOne();
    res.json({ message: "Member removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
