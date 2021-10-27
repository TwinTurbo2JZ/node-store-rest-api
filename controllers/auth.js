const User = require("../models/User");

exports.auth = (req, res, next) => {
  res.status(200).json({
    status: "Successful",
  });
};
