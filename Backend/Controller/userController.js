const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken')

const userModel = require("../Models/user.model");
const { catchAsyncFun } = require('../Middleware/errorHandler');

dotenv.config();
const jwtSecreteKey = process.env.SECRETE_KEY;

const userSignUp = async (req, res) => {

    console.log(req.body);
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.json({
            success: false,
            message: 'All Field is Required!'
        })
    }

    const isRegistered = await userModel.findOne({ email: email });
    if (isRegistered) {
        return res.json({
            success: false,
            message: 'User Already Registered'
        })
    }

    const slat = bcrypt.genSaltSync(10);

    const hasPassword = bcrypt.hashSync(password, slat);

    const user = await userModel.create({
        ...req.body,
        password: hasPassword
    })

    res.json({
        success: false,
        message: "user register successfully",
        id: user._id
    })

}

const sinIn = async (req, res) => {

    console.log(req.body);
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.json({
            success: false,
            message: 'Invalid user email please sinUp first!'
        })
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
        return res.json({
            sucess: false,
            message: 'Invalid user-id Password'
        })
    }

    const jwt_payload = {
        name: user.fullName,
        email: user.email,
        userId: user._id,
        exp: Math.ceil(new Date().getTime() / 1000 + 7200)
    }

    const token = jwt.sign(jwt_payload, jwtSecreteKey);

    await userModel.updateOne({ token: `Bearer ${token}` })

    res.json({
        success: false,
        message: 'Login Successfully',
        token: `Bearer ${token}`
    })

}


const logoutUser = async (req, res) => {
    await userModel.findByIdAndUpdate(req.user._id, { token: null })

    res.json({
        success: true,
        message: 'loged Out successfully'
    })
}

const userController = {
    userSignUp: catchAsyncFun(userSignUp),
    sinIn: catchAsyncFun(sinIn),
    logoutUser: catchAsyncFun(logoutUser)
}

module.exports = userController;