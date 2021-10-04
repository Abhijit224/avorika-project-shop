const express = require('express')
const mongoose = require('mongoose')
const ProductSchema = new mongoose.Schema({
    ProductName: {
        type: String,
    },
    ProductDescription: {
        type: String,
    },
    ProductPrice: {
        type: String,
    },

})