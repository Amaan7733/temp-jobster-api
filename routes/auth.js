const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authentication");
const testUser = require("../middleware/testUser");

const rateLimiter = require("express-rate-limit");
const APILimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, //15min
  max: 10,
  message: {
    msg: "Too many requests from this IP, please try again after sometimes",
  },
});

const { register, login, updateUser } = require("../controllers/auth");
router.post("/register", APILimiter, register);
router.post("/login", APILimiter, login);
router.patch("/updateUser", authenticateUser, testUser, updateUser);

module.exports = router;
