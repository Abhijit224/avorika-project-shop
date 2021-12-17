var express = require("express");
var router = express.Router();
const Category = require('../modal/Category')


/* GET home page. */
router.get("/", async(req, res, next) => {
    await Category.find()
        .then((categories) => {
            // res.render('index', {
            //     title: "Abhijit",
            //     info: undefined,
            //     categorylist: categories
            res.render("index", {
                title: "Abhijit",
                info: undefined,
                categorylist: categories
            });
        })

    .catch((error) => {
            console.log(error)
        })
        // res.render("index", { title: "Abhijit", info: undefined });
});

router.get("/index", async(req, res) => {
    const data = req.session.data;
    console.log("index router with session data..." + data)
    await Category.find().then((categories) => {
        res.render("index", {
            info: data,
            categorylist: categories
        });
    }).catch((error))

});

module.exports = router;