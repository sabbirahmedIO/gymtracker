const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    exerciseType: { type: String, required: true }, // e.g. Cardio, Strength
    exerciseName: { type: String, required: true }, // e.g. Running, Bench Press
    duration: { type: Number }, // minutes
    sets: { type: Number },
    reps: { type: Number },
    caloriesBurned: { type: Number },
    date: { type: Date, default: Date.now },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
