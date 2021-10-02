const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

//importing routes
const bootcamps = require("./routes/bootcamps.js");

//dotenv
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//mmorgan
if (process.env.NODE_ENV === "developement") {
  app.use(morgan("dev"));
}

//router routes
app.use("/", bootcamps);

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
