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
router.post('/addproduct',(req,res)=>{
    const p ={
        pname:req.body.productname,
        pcategory:req.body.selectcategory,
        pricerange:req.body.selectpricerange,
        make:req.body.make,
        Description:req.body.productdescription,
        price:req.body.productprice,
        discount:req.body.productdiscount,
       

    }
    console.log(p)
})

module.exports = router;