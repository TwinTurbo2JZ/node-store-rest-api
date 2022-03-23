const jwt = require("jsonwebtoken");
const ErrorResponse = require("./errorhandler/ErrorResponse");
const User = require("../models/User");

//protected routes

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // else if (req.cookies.token) {
    //   token = req.cookies.token;
    // }

    //Making sure token exists
    if (!token) {
      return next(new ErrorResponse("no token", 401));
    }

    //verifying token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SUPER_SECRET);
      // console.log(decoded);

      req.user = await User.findById(decoded.id);
      // console.log(req.user, "2");
      next();
    } catch (error) {
      return next(new ErrorResponse("Not authorized", 401));
    }
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Not authorized", 401));
  }
};

exports.authorization = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(`User role ${req.user.role} is not authorized`, 403)
      );
    }
    next();
  };
};
