const express = require('express')
const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
    ProductName: {
        type: String,
    },
    ProduuctCategory: {
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
    ProductImage: {
        type: String
    }

})