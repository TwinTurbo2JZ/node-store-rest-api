const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?w+)*(\.\w{2,3})+$/,
      "please enter a valid email",
    ],
  },
});

module.exports = mongoose.model("User", UserSchema);
