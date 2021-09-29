var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Abhijit", info: "kalukhe" });
});
router.get("/index", (req, res) => {
  const data = req.session.userinfo;
  res.render("index", {
    info: data,
  });
});

module.exports = router;
