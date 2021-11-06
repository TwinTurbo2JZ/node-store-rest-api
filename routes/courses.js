const express = require("express");
const router = express.Router({ mergeParams: true });

//importing from bootcamps controllers
const { getCourses } = require("../controllers/courses");

// root routed
router.route("/").get(getCourses);

module.exports = router;
