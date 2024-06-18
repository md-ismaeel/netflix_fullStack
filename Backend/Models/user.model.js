const mongoose = require('mongoose');
const validator = require("validator");

const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: [true, "FullName is Required!"]
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        validate: {
            validator: validator.isEmail,
            message: "Please enter a valid email address!"
        },
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minLength: [8, "Password should be atLeast 8 character!"],
    },
    token: {
        type: String,
        required: false,
        default: null
    }

}, {
    timestamps: true
})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;