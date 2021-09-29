const router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../../modal/User");

require("dotenv").config();

router.get("/", (req, res) => {
  res.render("UserViews/loginView");
});

router.post("/", async (req, res) => {
  await User.findOne({ UserEmail: req.body.email })
    .then((olduser) => {
      req.session.userinfo=olduser
      res.redirect("/index")
    })
    .catch((error) => {
      console.log(error);
    });
});
module.exports = router;
