exports.getBootCamps = (req, res, next) => {
  res.status(200).json({
    success: "true",
    message: "you see the page data",
  });
};

exports.createBootcamp = (req, res, next) => {
  res.status(200).json({
    status: "successful",
    message: "page created successfully",
  });
};

exports.getBootCamp = (req, res, next) => {
  res.status(200).json({
    status: "success",
    msg: `The id is:${req.params.id}`,
  });
};

exports.updateBootCamp = (req, res, next) => {
  res.status(200).json({
    status: "successful",
    message: `${req.params.id} updated successfully`,
  });
};

exports.deleteBootCamp = (req, res, next) => {
  res.status(200).json({
    status: "successful",
    message: `${req.params.id} deleted`,
  });
};
