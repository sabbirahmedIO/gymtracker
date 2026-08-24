const express = require("express");
const Workout = require("../models/Workout");
const { protect } = require("../middleware/auth");

const router = express.Router();

// @route  POST /api/workouts  (add a workout record)
router.post("/", protect, async (req, res) => {
  try {
    const { exerciseType, exerciseName, duration, sets, reps, caloriesBurned, date, notes } = req.body;

    const workout = await Workout.create({
      user: req.user.id,
      exerciseType,
      exerciseName,
      duration,
      sets,
      reps,
      caloriesBurned,
      date,
      notes,
    });

    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route  GET /api/workouts  (workout history for logged-in user)
router.get("/", protect, async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id }).sort({ date: -1 });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route  DELETE /api/workouts/:id
router.delete("/:id", protect, async (req, res) => {
  try {
    const workout = await Workout.findOne({ _id: req.params.id, user: req.user.id });
    if (!workout) return res.status(404).json({ message: "Workout not found" });

    await workout.deleteOne();
    res.json({ message: "Workout deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
