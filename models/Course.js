const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "please enter a title"],
  },
  description: {
    type: String,
    required: [true, "cannot add a product without describing it"],
  },
  weeks: {
    type: String,
    required: [true, "please add a course a course duration"],
  },
  tuition: {
    type: Number,
    required: [true, "add a tuition fee"],
  },
  minimumSkill: {
    type: String,
    required: [true, "Please add your skill"],
    enum: ["beginner", "intermediate", "advanced"],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
});

module.exports = mongoose.model("Course", CourseSchema);
