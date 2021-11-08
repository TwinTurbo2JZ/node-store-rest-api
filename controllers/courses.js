const Course = require("../models/Course");

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
