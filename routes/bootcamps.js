const express = require("express");
//including the courses router
const courseRouter = require("./courses");
const router = express.Router();

//importing from bootcamps controllers
const {
  getBootCamps,
  createBootcamp,
  deleteBootCamp,
  updateBootCamp,
  getBootCamp,
} = require("../controllers/bootcamps");

//Re-route into other routers
router.use("/:bootcampID/courses", courseRouter);

// root routed
router.route("/").get(getBootCamps).post(createBootcamp);

///routes with :id

router
  .route("/:id")
  .get(getBootCamp)
  .put(updateBootCamp)
  .delete(deleteBootCamp);

module.exports = router;
