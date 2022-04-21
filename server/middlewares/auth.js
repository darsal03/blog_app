const isAuth = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).redirect("/login");
  }
};

module.exports = { isAuth };
