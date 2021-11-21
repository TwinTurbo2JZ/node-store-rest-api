const User = require("../models/User");
const bcrypt = require("bcryptjs");
const ErrorResponse = require("../middleware/errorhandler/ErrorResponse");

//api/auth/register
//post
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

    //req.body works too fot the above

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

//api/auth/login
//private

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //validate the email and password mannualy
    if (!email || !password) {
      return next(
        new ErrorResponse("please enter and email and an password", 400)
      );
    }

    //check user

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid Credentials", 401));
    }

    //check password

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid Credentials", 401));
    }

    if (isMatch) {
      sendTokenResponse(user, 200, res);
    }
  } catch (error) {
    next(error);
  }
};

//get token from model and create cookie to send response

const sendTokenResponse = (user, statusCode, res) => {
  //create token
  const token = user.getSignedToken(); ////can the jwtsign() here as well

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    status: "successful",
    token,
  });
};
