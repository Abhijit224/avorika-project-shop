var express = require("express");
var router = express.Router();


/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("index", { title: "Abhijit", info: undefined });
});
router.get("/index", (req, res) => {
    const data = req.session.data;
    console.log("index router with session data..." + data)
    res.render("index", {
        info: data,
    });
});

module.exports = router;