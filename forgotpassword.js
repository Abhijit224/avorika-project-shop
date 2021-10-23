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
            console.log(user)
        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router;