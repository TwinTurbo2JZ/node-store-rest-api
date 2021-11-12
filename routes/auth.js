const express = require("express");

const router = express.Router();

const { register } = require("../controllers/auth.js");

router.post("/auth", register);

module.exports = router;
