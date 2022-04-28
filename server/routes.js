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
const {
  createBlog,
  getAllBlogsByUserId,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("./controllers/blog");

const router = express.Router();

//USER ROUTES
router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuth, logout);
router.get("/account", isAuth, getUser);
router.put("/:id", isAuth, updateUser);
router.delete("/:id", isAuth, deleteUser);

//BLOG ROUTES
router.post("/blog", isAuth, createBlog);
router.get("/blogs/:id", isAuth, getAllBlogsByUserId);
router.get("/blog/:id", isAuth, getBlog);
router.put("/blog/:id", isAuth, updateBlog);
router.delete("/blog/:id", isAuth, deleteBlog);

module.exports = { router };
