const express = require("express");

const app = express();

//importing routes
const bootcamps = require("./routes/bootcamps.js");

//dotenv
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//router routes
app.use("/", bootcamps);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`STATUS:Active in ${process.env.NODE_ENV} on ${port}`)
);
