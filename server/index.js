const express = require("express");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const cors = require("cors");

require("dotenv").config();

const app = express();
const connection = require("./database");
const { router } = require("./routes");

const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: `${process.env.DB_PASSWORD}`,
  database: "blog_app",
  clearExpired: true,
  checkExpirationInterval: 900000,
  expiration: 86400000,
  createDatabaseTable: true,
  connectionLimit: 1,
  endConnectionOnClose: true,
  charset: "utf8mb4_bin",
  schema: {
    tableName: "sessions",
    columnNames: {
      session_id: "session_id",
      expires: "expires",
      data: "data",
    },
  },
};

const sessionStore = new MySQLStore(options, connection);

app.use(
  session({
    key: "session_cookie_name",
    secret: "session_cookie_secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/user", router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
