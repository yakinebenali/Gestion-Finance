const express = require("express");
const { register } = require("../controllers/user.js");

const router = express.Router();
router.post('/Register',register);

module.exports = router;
