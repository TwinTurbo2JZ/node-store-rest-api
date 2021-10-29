const express = require("express");
const router = express.Router();

//importing from bootcamps controllers
const {
  getBootCamps,
  createBootcamp,
  deleteBootCamp,
  updateBootCamp,
  getBootCamp,
} = require("../controllers/bootcamps");

// root routed
router.route("/api").get(getBootCamps).post(createBootcamp);

///routes with :id

router
  .route("/:id")
  .get(getBootCamp)
  .put(updateBootCamp)
  .delete(deleteBootCamp);

module.exports = router;
