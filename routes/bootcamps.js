const express = require("express");
//including the courses router
const courseRouter = require("./courses");
const router = express.Router();

//importing protect middleware
const { protect, authorization } = require("../middleware/auth");

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
router
  .route("/")
  .get(getBootCamps)
  .post(protect, authorization("admin", "publisher"), createBootcamp);

///routes with :id

router
  .route("/:id")
  .get(getBootCamp)
  .put(protect, authorization("admin", "publisher"), updateBootCamp)
  .delete(protect, authorization("admin", "publisher"), deleteBootCamp);

module.exports = router;
