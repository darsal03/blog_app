const express = require("express");
const { isAuth } = require("./middlewares/auth");
const {
  register,
  login,
  logout,
  getUser,
  updateUser,
  deleteUser,
} = require("./controllers/user");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuth, logout);
router.get("/home", isAuth, getUser);
router.put("/:id", isAuth, updateUser);
router.delete("/:id", isAuth, deleteUser);

module.exports = { router };
