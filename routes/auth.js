const express = require("express");

const router = express.Router();

const { register, login, getMe } = require("../controllers/auth.js");

const { protect, authorization } = require("../middleware/auth");

// router.route("/auth/register").post(register);
router.post("/auth/register", register);
router.post("/auth/login", login);
// router.get( "/auth/me", protect, getMe);

router.route("/auth/me").get(protect, getMe);

module.exports = router;
