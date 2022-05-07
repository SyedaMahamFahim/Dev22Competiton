const express = require("express");
const {
  register,
  login,
  logout,
  getAllUsersEmail
} = require("../controllers/userController");

const router = express.Router();

// For Users
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/get-all-users-email").get(getAllUsersEmail);





module.exports = router;
