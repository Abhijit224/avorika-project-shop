const router = require('express').Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const flash = require('connect-flash');
const User = require('../../modal/User');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: process.env.EmailService,
    auth: {
        user: process.env.ServiceUser,
        pass: process.env.ServicePassword
    }
})
router.post('/', (req, res) => {
    User.findOne({ UserEmail: req.body.email })
        .then((user) => {
            if (user == null) {
                res.render('UserViews/loginView', { message: "Email is not Valid or Not in Database" })
            }
            const secret = process.env.Reset_Password_Key + user._id;
            const payload = {
                id: user._id,
                email: user.UserEmail
            }
            const token = jwt.sign(payload, secret, { expiresIn: '30m' });
            const data = {
                from: 'Avorika Infotech <node2204-1979@outlook.com>',
                to: user.UserEmail,
                subject: 'Password Reset Link',
                html: `
                <h1>Please click on given link to reset password</h1>
                <p><a href='http://localhost:3000/resetpassword/${user._id}/${token}'>${token}</a></p>
            `
            }
            transporter.sendMail(data, function(err, info) {
                if (err) {
                    console.log(err)
                    return
                }
            })
        })
        .catch((error) => {
            console.log(error)
        })
})



module.exports = router;