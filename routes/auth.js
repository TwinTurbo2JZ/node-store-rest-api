const express = require("express");

const router = express.Router();

const { register } = require("../controllers/auth.js");

// router.route("/auth/register").post(register);
router.post("/auth/register", register);

module.exports = router;
