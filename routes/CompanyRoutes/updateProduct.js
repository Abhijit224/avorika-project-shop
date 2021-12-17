const router = require('express').Router();
const mongoose = require('mongoose');
const Product = require('../../modal/Product')
var multer = require('multer');
var path = require('path');

// Set The Storage Engine
const storage = multer.diskStorage({
    destination: './ProductImages/',
    filename: function(req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
})

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

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
    console.log("Update Router..." + req.body.productid)
    if (req.file == undefined) {
        console.log("File is no Selected")
        Product.findOneAndUpdate({ _id: req.body.productid }, {
                $set: {
                    ProductDescription: req.body.productdescription,
                    ProductPrice: req.body.productprice,
                    ProductDiscount: req.body.productdiscount,
                    ProductFinalPrice: req.body.productfinalprice
                }
            })
            .then((updatedProduct) => {
                res.redirect("/company")
            })
            .catch((error) => {
                console.log(error)
            })
    } else {
        Product.findOneAndUpdate({ _id: req.body.productid }, {
                $set: {
                    ProductDescription: req.body.productdescription,
                    ProductPrice: req.body.productprice,
                    ProductDiscount: req.body.productdiscount,
                    ProductFinalPrice: req.body.productfinalprice,
                    ProductImage: req.file.path
                }
            })
            .then((updatedProduct) => {
                res.redirect("/company")
            })
            .catch((error) => {
                console.log(error)
            })
    }
})
module.exports = router