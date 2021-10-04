var router = require('express').Router();

router.get('/', (req, res) => {
    const data = req.session.data;

    if (data == undefined) {
        console.log('go to the login page')
        res.redirect('/login')
    } else {
        console.log('go to the admin page')
        res.render('AdminViews/admin', { info: data })
    }
})


module.exports = router;