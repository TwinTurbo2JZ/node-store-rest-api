const User = require("../models/User");

//api/auth/register
exports.register = (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const user = User.create({
      name,
      password,
      email,
      role,
    });

    res.status(200).json({
      status: "Successful",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
