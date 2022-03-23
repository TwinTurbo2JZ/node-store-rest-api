const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");

const ErrorResponse = require("../middleware/errorhandler/ErrorResponse");

exports.getCourses = async (req, res, next) => {
  try {
    let query;

    if (req.params.bootcampID) {
      query = Course.find({ bootcamp: req.params.bootcampID });
    } else {
      query = Course.find().populate({
        path: "bootcamp",
        select: "name description",
      });
    }

    let courseData = await query;

    res.status(200).json({
      status: "successfull",
      count: courseData.length,
      data: courseData,
    });
  } catch (error) {
    next(error);
  }
};

//public :id
exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate({
      path: "bootcamp",
      select: "name description",
    });

    if (!course) {
      return next(
        new ErrorResponse(`No courses with the id ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      status: "successful",
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

//add a course
//api/bootcamps/"bootcampID/courses
//private

exports.addCourse = async (req, res, next) => {
  try {
    req.body.bootcamp = req.params.bootcampID;
    req.body.user = req.user.id;
    console.log(req);

    const bootcamps = await Bootcamp.findById(req.params.bootcampID);
    if (!bootcamps) {
      return next(
        new ErrorResponse(
          `No bootcamp with the id ${req.params.bootcampID}`,
          404
        )
      );
    }

    //Make sure User owns the bootcamp
    if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
      return next(
        new ErrorResponse(
          `this user did not make the course ${bootcamp._id}`,
          401
        )
      );
    }

    const course = await Course.create(req.body);

    res.status(200).json({
      status: "successful",
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

//update a course
//api/courses:id
//private
//put

exports.updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidator: true,
    });

    if (!course) {
      return next(
        new ErrorResponse(
          `course not found with the id of ${req.params.id}`,
          404
        )
      );
    }

    res.status(200).json({
      status: "successful",
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

//private
//deletecourse
//api/courses:id
exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return next(
        new ErrorResponse(
          `course not found with the id of ${req.params.id}`,
          404
        )
      );
    }

    res.status(200).json({
      status: "successful",
      messege: "course deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
