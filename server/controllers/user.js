const bcrypt = require("bcrypt");
const db = require("../database");

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const sql = `SELECT * FROM users WHERE user_name = "${username}"`;
    const [[user]] = await db.query(sql);

    if (user) {
      res.status(400).json({ msg: `user ${username} already exists` });
    } else if (foundUserPassword) {
      res.status(400).json({ msg: "that password is taken" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.query(
        `INSERT INTO users(user_name,user_password) VALUES ("${username}","${hashedPassword}")`
      );
      res.status(201).json({});
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const sql = `SELECT * FROM users WHERE user_name = "${username}"`;
    const [[user]] = await db.query(sql);

    if (!user) {
      res.status(404).json({ msg: "user is wrong" });
      return;
    }

    const passwordsEqual = await bcrypt.compare(password, user.user_password);

    if (passwordsEqual) {
      req.session.userId = user.user_id;
      res.status(200).json({});
    } else {
      res.status(400).json({ msg: "password is wrong" });
    }
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      console.log(err);
    });
    res.status(200).json({ msg: "log out was successful" });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const sql = `SELECT user_id,user_name FROM users WHERE user_id = ${req.session.userId}`;
    const [[user]] = await db.query(sql);

    if (user) res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    const sql = `UPDATE users SET user_name = "${username}" WHERE user_id = ${id}`;
    const updatedUser = await db.query(sql);

    if (updatedUser) {
      res.status(200).json({ msg: "update was successful" });
    } else {
      res.status(400).json({});
    }
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const sql = `DELETE FROM users WHERE user_id = ${id}`;
    await db.query(sql);

    res.status(200).json({ msg: "deletion was successful" });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, logout, getUser, updateUser, deleteUser };
