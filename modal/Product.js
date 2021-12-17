const express = require('express')
const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
    ProductName: {
        type: String,
    },
    ProductCategory: {
        type: String,
    },
    ProductPriceRange: {
        type: String
    },
    ProductMake: {
        type: String
    },
    ProductDescription: {
        type: String,
    },
    ProductPrice: {
        type: String,
    },
    ProductDiscount: {
        type: String
    },
    ProductFinalPrice: {
        type: String
    },
    ProductImage: {
        type: String
    },
    SupplierRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SupplierSchema",
    }
})
const Product = mongoose.model('product', ProductSchema);
module.exports = Product;