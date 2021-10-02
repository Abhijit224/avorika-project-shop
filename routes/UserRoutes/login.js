const router = require("express").Router();
const { check, validationResult, custom } = require("express-validator");
const mongoose = require("mongoose");
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../../modal/User");

require("dotenv").config();

router.get("/", (req, res) => {
    res.render("UserViews/loginView");
});

router.post("/", async(req, res) => {
    await User.findOne({ UserEmail: req.body.email })
        .then((olduser) => {
            const pass = olduser.UserPassword;
            bcrypt.compare(req.body.password, pass, function(err, result) {
                if (result === true) {
                    if (olduser.UserEmail == 'kalukhe.abhijit@gmail.com') {
                        console.log('open admin page')
                        req.session.data = olduser
                        res.redirect('/admin')
                    } else if (olduser.UserRole == 'Shop') {
                        console.log("open company page")
                        res.redirect('/company')
                    } else {
                        console.log('open customer page')
                        req.session.data = olduser
                        res.redirect("/index")
                    }
                } else {
                    res.render("UserViews/loginView", { pass: "Email and Password did not Match.." });
                }
            })
        })
        .catch((error) => {
            console.log(error);
            res.render("UserViews/loginView", { pass: "something is missing" });
        });
});
module.exports = router;