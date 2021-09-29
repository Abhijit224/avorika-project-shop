const express = require("express");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    GoogleId: {
        type: String,
    },
    UserFirstName: {
        type: String,
    },
    UserLastName: {
        type: String,
    },
    UserEmail: {
        type: String,
    },
    UserContact: {
        type: String,
    },
    UserAddress: {
        type: String,
    },
    UserPassword: {
        type: String,
    },
    CompanyName: {
        type: String,
    },
    UserAadhar: {
        type: String,
    },
    UserGST: {
        type: String,
    },
    UserRole: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    UserImage: {
        data: Buffer,
        type: String,
    },
    ProductRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductSchema",
    },
    resetlink: {
        type: String,
        default: ''
    }
});

const User = mongoose.model("user", UserSchema);
module.exports = User;