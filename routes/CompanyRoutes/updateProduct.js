const router = require('express').Router();
const mongoose = require('mongoose');
const Product = require('../../modal/Product')
var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './ProductImages');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toDateString() + "_" + file.originalname);
    }
});
var upload = multer({ storage: storage })

router.get('/:id', (req, res) => {
    const data = req.session.data

    const id = req.params.id
    if (data != undefined) {
        Product.findOne({ _id: mongoose.Types.ObjectId(id) })
            .then((product) => {
                res.render("CompanyViews/update", {
                    info: data,
                    product: product
                })
            })
            .catch((error) => {
                console.log("Promiss rejection")
            })
    } else {
        res.redirect()
    }
})
router.post('/', upload.single('productimage'), (req, res) => {
    console.log(req.body.productname)
    const pi = req.file.path
    if (req.file) {
        const image = req.file.path;
        console.log(image)
    }
})
module.exports = router