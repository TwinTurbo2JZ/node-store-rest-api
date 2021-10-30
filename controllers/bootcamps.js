//importing the schema
const Bootcamp = require("../models/Bootcamp");
//importing the custom error handler class
const ErrorResponse = require("../middleware/errorhandler/ErrorResponse");

exports.getBootCamps = async (req, res, next) => {
  try {
    //cpoying the query without mutating
    let reqQuery = { ...req.query };

    //making querystring
    let queryString = JSON.stringify(reqQuery);

    //regex for price type check, refers mongoose for more details
    queryString = queryString.replace(
      /\b(gt|gte|lte|ls|in)\b/g,
      (match) => `$${match}`
    );

    //what to remove from qurystring
    const removeFileds = ["select"];
    //removing the above
    removeFileds.forEach((params) => delete reqQuery[params]);
    // console.log(reqQuery);

    //modifying the apove to show certain information in the object

    if (req.query.select) {
      var field = req.query.select.split(",").join(" ");
    }

    //parsing as JSON
    let endQueryString = JSON.parse(queryString);

    const bootcamps = await Bootcamp.find(endQueryString, field);

    //we can also do .select(field) for the same results, but the above is in the docs and it works

    res.status(200).json({
      status: "successful",
      count: bootcamps.length,
      data: bootcamps,
    });

    if (!bootcamps) {
      return res.status(400).json({
        status: "unsucessful",
      });
    }
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
