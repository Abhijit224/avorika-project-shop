const express = require("express");
const mongoose = require("mongoose");
const CategoriesSchema = mongoose.Schema({
    CategoryName: {
        type: String,
    },
    CategoryDescription: {
        type: String
    }
})
const Category = mongoose.model('category', CategoriesSchema);
module.exports = Category;