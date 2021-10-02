var router = require('express').Router();

router.get('/', (req, res) => {
    const data = req.session.data;
    console.log('data from admin js...' + data)
    res.render('AdminViews/admin', { info: data })
})


module.exports = router;