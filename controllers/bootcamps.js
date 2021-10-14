//importing the schema
const Bootcamp = require("../models/Bootcamp");

exports.getBootCamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();

    if (!bootcamps) {
      return res.status(400).json({
        status: unsucessful,
      });
    }
    res.status(200).json({
      success: "true",
      count: bootcamps.length,
      bootcamps: bootcamps,
    });
  } catch (error) {
    res.status(400).json({
      status: unsucessful,
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
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({
        status: "unsuccessful",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "successful",
      bootcamp: bootcamp,
    });
  } catch (error) {
    res.status(400).json({
      status: "unsuccessful",
      message: error.message,
    });
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
