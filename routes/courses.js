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
const { protect, authorization } = require("../middleware/auth");

// root routed
router
  .route("/")
  .get(getCourses)
  .post(protect, authorization("admin", "publisher"), addCourse);
router
  .route("/:id")
  .get(getCourse)
  .put(protect, authorization("admin", "publisher"), updateCourse)
  .delete(protect, authorization("admin", "publisher"), deleteCourse);

module.exports = router;
