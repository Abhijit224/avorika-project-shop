const express = require("express");
const mongoose = require("mongoose");
const CategoriesSchema = mongoose.Schema({
    CategoryName: {
        type: String,
    },
    CategoryDescription: {
        type: String
    },
    SubCategory:{
        price:{
            type:String,
        },
        discount:{
            type:String,
        },
        make:{
            type:String,
        }
    }
})
const Category = mongoose.model('category', CategoriesSchema);
module.exports = Category;