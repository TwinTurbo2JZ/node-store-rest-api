const express = require("express");
const router = express.Router({ mergeParams: true });

//importing from bootcamps controllers
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");

//importing protect middleware
const { protect } = require("../middleware/auth");

// root routed
router.route("/").get(getCourses).post(addCourse);
router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
