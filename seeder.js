const dotenv = require("dotenv");
const mongoose = require("mongoose");
const process = require("process");

const Bootcamp = require("./models/Bootcamp");

dotenv.config({ path: "./config.env" });

//saving the json data in a var
const bootcamps = require("./_data/bootcamps.json");

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
