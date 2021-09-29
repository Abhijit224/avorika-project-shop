const express = require("express");
const passport = require("passport");
const router = express.Router();
const session = require("express-session");
const User = require("../modal/User");
const { Cookie, Session } = require("express-session");

require("../utility/google_auth");
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    authType: "rerequest",
    accessType: "offline",
    prompt: "consent",
    includeGrantedScopes: true,
  })
);

router.get(
  "/auth/google/redirect",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    const data = userProfile;
    googledata = {
      UserName: data.displayName,
      UserEmail: data.emails[0].value,
      UserImage: data.photos[0].value,
    };
    req.session.data = googledata;
    res.redirect("/login");
  }
);
module.exports = router;
