var router = require('express').Router();
const Category = require('../../modal/Category')

router.get('/', (req, res) => {
    const data = req.session.data;

    if (data == undefined) {
        console.log('go to the login page')
        res.redirect('/login')
    } else {
        console.log('go to the admin page')
        res.render('AdminViews/admin', {
            info: data
        })
    }
})
router.post('/addcategory', (req, res) => {
    new Category({
        CategoryName: req.body.categoryname,
        CategoryDescription: req.body.categorydescription,
        SubCategory:{
            price: req.body.selectprice,
            discount: req.body.discount,
            make: req.body.make,
        }
        
    }).save().then((result)=>{
        console.log(result.SubCategory.discount)
    }).catch((error)=>{
        console.log(error)
    })
 
  
})
module.exports = router;