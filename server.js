const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorhandler/error");

//cookie parser
const cookieParser = require("cookie-parser");

const app = express();

//middlewares

//body parser
app.use(express.json());
//cookie parser
app.use(cookieParser());

//importing routes
const bootcamps = require("./routes/bootcamps.js");
const courses = require("./routes/courses");
//importing auth
const auth = require("./routes/auth.js");

//dotenv
const dotenv = require("dotenv");
const errorHanlder = require("./middleware/errorhandler/error");
const ErrorResponse = require("./middleware/errorhandler/ErrorResponse");
dotenv.config({ path: "./config.env" });

//morgan
if (process.env.NODE_ENV === "developement") {
  app.use(morgan("dev"));
}

//router routes
app.use("/api/bootcamps", bootcamps);
app.use("/api/courses", courses);
app.use("/api", auth);

// //path not found

app.all("*", (req, res) => {
  const err = new Error(`Url ${req.path} not found`);

  res.status(404).json({
    status: "unsuccessful",
    message: err.message,
    stack: err.stack,
  });
});

//error handler middleware
app.use(errorHanlder);

//PORTS

const port = process.env.PORT || 5000;

//SERVER LISTENING HERE

const server = app.listen(port, () =>
  console.log(`STATUS:Active in ${process.env.NODE_ENV} on ${port}`)
);

//connecting to db
//Handling db errors

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`DATABASE CONNECTED`);
  } catch (error) {
    console.log(error.message);
    server.close(() => process.exit(1));
  }
};

connectDB();
