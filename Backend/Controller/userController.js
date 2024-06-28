const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken')

const userModel = require("../Models/user.model");
const { catchAsyncFun } = require('../Middleware/errorHandler');

dotenv.config();
const jwtSecreteKey = process.env.SECRETE_KEY;

const userSignUp = async (req, res) => {

    const { fullName, email, password } = req.body;
    console.log(fullName, email, password);



    if (!fullName || !email || !password) {
        return res.status(401).json({
            success: false,
            message: 'All input field is required!'
        })
    }

    const isRegistered = await userModel.findOne({ email });
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
        success: true,
        message: "user register successfully",
        id: user._id
    })

}

const sinIn = async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required fields'
        });
    }


    const user = await userModel.findOne({ email });


    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'Invalid email, please sign up first'
        });
    }


    const isValidPassword = await bcrypt.compare(password, user.password);


    if (!isValidPassword) {
        return res.status(401).json({
            success: false,
            message: 'Invalid password'
        });
    }

    const expTime = Math.ceil(new Date().getTime() / 1000) + 864000;
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        fullName: user.fullName,
        exp: expTime
    };

    const token = jwt.sign(jwtPayload, jwtSecreteKey);

    // Set token in cookie

    // res.cookie('token', token, {
    //     httpOnly: true,
    //     secure: true, // for HTTPS
    //     sameSite: 'none', // for cross-site cookies
    //     domain: '.vercel.app', // adjust this to match your domain
    //     path: '/',
    //     maxAge: 7200000 // 2 hours in milliseconds
    // });

    res.setHeader('Authorization', `Bearer ${token}`);

    res.status(200).json({
        success: true,
        message: `Login successful, welcome ${user.fullName}`,
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        },
        token: `Bearer ${token}`
    });
}


const logoutUser = async (req, res) => {
    console.log("req.user", req.user);
    const { _id } = req.user;

    await userModel.findByIdAndUpdate(_id, { token: null });

    // Clear the cookie
    // res.clearCookie('token', {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: 'none',
    //     domain: '.vercel.app', // adjust this to match your domain
    //     path: '/'
    // });

    res.json({
        success: true,
        message: 'User logged out successfully'
    });

}

const userController = {
    userSignUp: catchAsyncFun(userSignUp),
    sinIn: catchAsyncFun(sinIn),
    logoutUser: catchAsyncFun(logoutUser)
}

module.exports = userController;

