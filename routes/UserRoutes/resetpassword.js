const router = require('express').Router();
const User = require('../../modal/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt(10);
require('dotenv').config();

router.get('/resetpassword/:id/:token', (req, res) => {
    const { id, token } = req.params;
    User.findById({ _id: id })
        .then((user) => {
            if (!user) {
                return res.send('user not found ...')
            }
            const secret = process.env.Reset_Password_Key + user._id;
            try {
                const payload = jwt.verify(token, secret)
                res.render('UserViews/resetpassword', { email: user.UserEmail })
            } catch (error) {
                console.log(error)
            }
        })
        .catch((error) => {
            console.log(error)
        })
})

router.post('/resetpassword/:id/:token', (req, res) => {
    const { id, token } = req.params;
    const { password, cpassword } = req.body
    if (password != cpassword) {
        res.json("Password did not match...")
    }
    const hashpassword = bcrypt.hashSync(password, 10)
    User.findById({ _id: id })
        .then((user) => {
            if (!user) {
                return res.send("user not found...")
            }
            const secret = process.env.Reset_Password_Key + user._id;
            try {
                const payload = jwt.verify(token, secret)
                User.findByIdAndUpdate({ _id: id }, { UserPassword: hashpassword }, function(error, doc) {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log("Updated User :", doc);
                        res.render("UserViews/loginView")
                    }
                })
            } catch (error) {
                console.log(error)
            }
        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router;