const mysql = require("mysql2/promise");
require("dotenv").config();

module.exports = mysql.createPool({
  host: "localhost",
  user: "root",
  password: `${process.env.DB_PASSWORD}`,
  database: "blog_app",
});
