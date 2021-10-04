var router = require('express').Router();
var categories = require('../../modal/Category')

router.get('/', async(req, res) => {
    const data = req.session.data;
    if (data == undefined) {
        res.redirect('/login')
    }
    await categories.find().then((catlist) => {
        const list = catlist;
        res.render('CompanyViews/company', { info: data, list: list })
    })

})
module.exports = router;