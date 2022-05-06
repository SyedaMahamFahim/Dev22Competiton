const express = require("express");
const {
  register,
  login,
  logout,

} = require("../controllers/userController");

const router = express.Router();

// For Users
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);




module.exports = router;
