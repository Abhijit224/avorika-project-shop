const router = require("express").Router();
const { check, validationResult, custom } = require("express-validator");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSalt(10);
const User = require("../../modal/User");

let mr = "^[1-9]{1}[0-9]{9}$";
let gstregex = "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$";
let aadharregex = "^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$";

router.get("/", (req, res) => {
    res.render("UserViews/registerView");
});

router.post(
    "/", [
        check("firstname", "First Name must be 3+ character long..")
        .exists()
        .isLength({ min: 3 }),


    ],
    async(req, res, done) => {

        const errors = validationResult(req);

        if (req.body.password != req.body.cpassword || !errors.isEmpty()) {
            const alert = errors.array();
            res.render("UserViews/registerView", {
                alert,
                pass: "Password did not match",
            });
        } else {
            await User.findOne({ UserEmail: req.body.email })
                .then((currentUser) => {
                    if (currentUser) {
                        console.log("user is present in database..");
                        res.render("UserViews/loginView", { pass: "Already register" });
                    } else {
                        const password = req.body.password;
                        const bcryptpassword = bcrypt.hashSync(password, 10);
                        new User({
                            UserRole: req.body.Role,
                            CompanyName: req.body.company,
                            UserFirstName: req.body.firstname,
                            UserLastName: req.body.lastname,
                            UserEmail: req.body.email,
                            UserContact: req.body.mobile,
                            UserAddress: req.body.address,
                            UserAadhar: req.body.aadhar,
                            UserGST: req.body.gst,
                            UserPassword: bcryptpassword,
                        }).save().then((newUser) => {
                            res.render("UserViews/loginView")

                        })
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
);

module.exports = router;