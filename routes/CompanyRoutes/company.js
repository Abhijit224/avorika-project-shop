var router = require('express').Router();
var categories = require('../../modal/Category');
var Product = require("../../modal/Product");
var multer = require('multer');
var path = require('path');

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './ProductImages/',
    filename: function(req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
});
var upload = multer({ storage: storage })
router.get('/', async(req, res) => {
    const data = req.session.data;
    if (data == undefined) {
        res.redirect('/login')
    }
    await categories.find().then((catlist) => {
        Product.find().then((products) => {
            console.log(products.ProductCategory)
            const list = catlist;
            res.render('CompanyViews/company', {
                info: data,
                list: list,
                productlist: products
            })
        })
    }).catch((error) => {
        console.log(error)
    })
})
router.post('/addproduct', upload.single("productimage"), async(req, res) => {
    const data = req.session.data;
    await new Product({
            ProductName: req.body.productname,
            ProductCategory: req.body.selectcategory,
            ProductPriceRange: req.body.selectpricerange,
            ProductMake: req.body.make,
            ProductDescription: req.body.productdescription,
            ProductPrice: req.body.productprice,
            ProductDiscount: req.body.productdiscount,
            ProductFinalPrice: req.body.productfinalprice,
            ProductImage: req.file.path,
            SupplierRef: data._id
        })
        .save()
        .then((newProduct) => {
            console.log(newProduct)
            res.redirect("/company")
        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router;