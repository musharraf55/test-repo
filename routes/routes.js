const express = require("express");
const { signup, login } = require("../controllers/userController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", auth, login);

module.exports = router;
