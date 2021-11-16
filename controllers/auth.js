const User = require("../models/User");
const bcrypt = require("bcryptjs");

//api/auth/register
exports.register = async (req, res, next) => {
  try {
    let { name, email, password, role } = req.body;

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(req.body.password, salt);
    //or we can do req.body.password instead of the wbpve and use req.body in
    //User.create
    //can do it models as well with Schema.pre

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    //req.body works too

    //generate auth token
    const token = user.getSignedToken();

    res.status(200).json({
      status: "Successful",
      token,
    });
  } catch (error) {
    next(error);
  }
};
