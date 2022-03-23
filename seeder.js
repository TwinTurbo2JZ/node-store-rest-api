const dotenv = require("dotenv");
const mongoose = require("mongoose");
const process = require("process");

//importing the Models
const Bootcamp = require("./models/Bootcamp");
const Courses = require("./models/Course");
const User = require("./models/User");

dotenv.config({ path: "./config.env" });

//saving the json data in a var
const bootcamps = require("./_data/bootcamps.json");
const courses = require("./_data/courses.json");
const users = require("./_data/users.json");

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
    await Courses.insertMany(courses);
    await User.insertMany(users);
    console.log(`Data imported`);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

//delete all data
const deleteData = async () => {
  try {
    await Courses.deleteMany();
    await Bootcamp.deleteMany();
    await User.deleteMany();
    console.log(`Data deleted`);
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
    console.log("data deletion initialted");
    break;
  }
  default:
    {
      importData();
      console.log("Data import initiated");
    }
    break;
}
