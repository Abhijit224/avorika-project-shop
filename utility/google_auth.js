const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../modal/User");

require("dotenv").config();
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/redirect",
      accessType: "offline",
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      User.findOne({
        GoogleId: profile.id,
        UserEmail: profile.emails[0].value,
      })
        .then((currentUser) => {
          if (currentUser) {
            console.log("User is present in database");
            return done(null, currentUser);
          } else {
            new User({
              GoogleId: profile.id,
              UserName: profile.displayName,
              UserEmail: profile.emails[0].value,
              UserImage: profile.photos[0].value,
              UserPassword: "avorika",
            })
              .save()
              .then((newUser) => {
                console.log("Create new user" + newUser);
                return done(null, newUser);
              });
          }
        })
        .catch((error) => console.log(error));

      return done(null, userProfile);
    }
  )
);
module.exports = passport;
