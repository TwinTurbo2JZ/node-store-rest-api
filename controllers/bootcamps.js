//importing the schema
const Bootcamp = require("../models/Bootcamp");
//importing the custom error handler class
const ErrorResponse = require("../middleware/errorhandler/ErrorResponse");

exports.getBootCamps = async (req, res, next) => {
  try {
    let queryString = JSON.stringify(req.query);

    queryString = queryString.replace(
      /\b(gt|gte|lte|ls|in)\b/g,
      (match) => `$${match}`
    );

    let endQueryString = JSON.parse(queryString);

    const bootcamps = await Bootcamp.find(endQueryString);

    res.status(200).json({
      status: "successful",
      count: bootcamps.length,
      data: bootcamps,
    });

    // if (queryString) {
    //   await Bootcamp.find(JSON.parse(queryString), (err, data) => {
    //     if (err) {
    //       console.log(err);
    //     }

    //     if (data) {
    //       console.log(data, "reeee");
    //       return res.status(200).json({
    //         success: "true",
    //         count: data.length,
    //         bootcamps: data,
    //       });
    //     }
    //   });
    // }

    // if (!queryString) {
    //   var bootcamps = await Bootcamp.find();

    //   return res.status(200).json({
    //     success: "true",
    //     count: bootcamps.length,
    //     bootcamps: bootcamps,
    //   });
    // }

    // if (!bootcamps) {
    //   return res.status(400).json({
    //     status: "unsucessful",
    //   });
    // }
  } catch (error) {
    res.status(400).json({
      status: "unsucessful",
      message: error.message,
    });
  }
};

//public
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      status: "successful",
      message: "page created successfully",
      data: bootcamp,
    });
  } catch (error) {
    res.status(400).json({
      status: "unsuccessful",
      message: error.message,
      data: error,
    });
  }
};

//
exports.getBootCamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.query);
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      status: "successful",
      bootcamp: bootcamp,
    });
  } catch (err) {
    // next( new ErrorResponse(`Product not found with id of ${req.params.id}`, 404))
    next(err);

    console.log(err.stack);
  }
};

exports.updateBootCamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return res.status(400).json({
        status: "unsuccesful",
        data: "Products not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: bootcamp,
    });
  } catch (error) {
    res.status(400).json({
      status: "unsuccessful",
      message: error.message,
    });
  }
};

exports.deleteBootCamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({
        status: "unsuccessful",
      });
    }

    res.status(200).json({
      status: "successful",
      message: "item deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "unsuccessful",
      message: error.message,
    });
  }
};
