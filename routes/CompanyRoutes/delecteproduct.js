const router = require('express').Router();
const mongoose = require('mongoose');
const Product = require('../../modal/Product');

router.get('/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    Product.findOneAndDelete({ _id: mongoose.Types.ObjectId(id) })
        .then((err) => {
            if (err) {
                console.log(err)
            } else {
                res.redirect("/company");
            }
        })
        .catch((error) => { console.log(error) })
})
module.exports = router