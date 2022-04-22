const db = require("../database");

const createBlog = async (req, res, next) => {
  try {
    const { title, text } = req.body;
    const sql = `INSERT INTO blogs(blog_title,blog_text,user_id,created_at) VALUES ("${title}","${text}",${req.session.userId},current_time)`;
    const blog = await db.query(sql);

    if (blog) {
      res.status(201).json({});
    } else {
      res.status(400).json({});
    }
  } catch (error) {
    next(error);
  }
};

const getAllBlogsByUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sql = `SELECT * FROM blogs WHERE user_id = ${id}`;
    const [blogs] = await db.query(sql);

    if (blogs) {
      res.status(200).json([blogs]);
    } else {
      res.status(400).json({});
    }
  } catch (error) {
    next(error);
  }
};

const getBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sql = `SELECT * FROM blogs WHERE user_id = ${req.session.userId} AND blog_id = ${id} `;
    const [[blog]] = await db.query(sql);

    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(400).json({});
    }
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, text } = req.body;
    let sql = "";

    if (!title && text) {
      sql = `UPDATE blogs SET blog_text = "${text}" WHERE user_id = ${req.session.userId} AND blog_id = ${id}`;
      console.log("only text was updated");
    }

    if (!text && title) {
      sql = `UPDATE blogs SET blog_title = "${title}" WHERE user_id = ${req.session.userId} AND blog_id = ${id}`;
      console.log("only title was updated");
    }

    if (title && text) {
      sql = `UPDATE blogs SET  blog_title = "${title}",blog_text = "${text}"  WHERE user_id = ${req.session.userId} AND blog_id = ${id}`;
      console.log("full update");
    }

    const [updatedBlog] = await db.query(sql);

    if (updatedBlog.affectedRows === 1) {
      res.status(200).json({ msg: "update was successful" });
    } else {
      res.status(400).json({});
    }
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sql = `DELETE FROM blogs WHERE user_id = ${req.session.userId} AND blog_id = ${id}`;

    await db.query(sql);
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBlog,
  getAllBlogsByUserId,
  getBlog,
  updateBlog,
  deleteBlog,
};
