const express = require("express");

const router = express.Router();

const { register, login } = require("../controllers/auth.js");

// router.route("/auth/register").post(register);
router.post("/auth/register", register);
router.post("/auth/login", login);

module.exports = router;
