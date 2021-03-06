const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "please add your email"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?w+)*(\.\w{2,3})+$/,
      "please enter a valid email",
    ],
  },
  role: {
    type: String,
    enum: ["user", "publisher", "admin"],
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

//Encrypt password using bcrypt
// UserSchema.pre("save", async function (next) {

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

//genetate token //can be put in the controller
UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SUPER_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("User", UserSchema);
