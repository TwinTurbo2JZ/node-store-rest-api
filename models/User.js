const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    type: String,
    required: [true, "please add your email"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?w+)*(\.\w{2,3})+$/,
      "please enter a valid email",
    ],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
