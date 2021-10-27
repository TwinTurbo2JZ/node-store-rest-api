const ErrorResponse = require('./ErrorResponse');



const errorHanlder = async (error, req, res, next) => {

  let err = { ...error}
  err.message = error.message;

  if(error.name === 'CastError') {
  err = new ErrorResponse(`Produt not with the id of ${error.value}`,   404)
}


  await res.status(err.statusCode || 500).json({
    status: "unsuccessful",
    message: err.message || "Server Error"
  });
};

module.exports = errorHanlder;
