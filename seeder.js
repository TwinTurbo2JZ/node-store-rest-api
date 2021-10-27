const fs = require("fs");
const dotenv = require("dotenv");
const { fileURLToPath } = require("url");
const { dirname } = require("path");
const mongoose = require("mongoose");
const process = require("process");

const Bootcamp = require("./models/Bootcamp");

dotenv.config({ path: "./config.env" });

//saving the json data in a var
const bootcamps = require("../node-store-api/_data/bootcamps.json");

//connecting to the Database

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};

connectDB();

//iporting data
const importData = async () => {
  try {
    await Bootcamp.insertMany(bootcamps);
    console.log(`inserted`);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//delete all data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log(`deleted`);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//running the seeder functions

// if (process.argv[2] === "-i") {
//   console.log("i");
//   importData();
// } else if (process.argv[2] === "-d") {
//   console.log("gg");
//   deleteData();
// }

switch (process.argv[2]) {
  case "-d": {
    deleteData();
    console.log("data deleted");
    break;
  }
  default:
    {
      importData();
      console.log("Data imported from bootcamps.json");
    }
    break;
}
