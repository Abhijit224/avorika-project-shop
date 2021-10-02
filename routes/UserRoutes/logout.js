const router = require("express").Router();

router.get("/", (req, res) => {
    req.session.destroy((error) => {
        if (error) throw error;
        console.log(error)
    });
    res.redirect("/index");
});

module.exports = router;