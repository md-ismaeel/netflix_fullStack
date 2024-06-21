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


    const jwtPayload = {
        userId: user._id,
        email: user.email,
        fullName: user.fullName
    };

    const token = jwt.sign(jwtPayload, jwtSecreteKey, { expiresIn: '2h' });


    user.token = token;
    await user.save();

    // Set token in cookie
    res.cookie('token', token, { httpOnly: true, secure: true });


    res.status(200).json({
        success: true,
        message: `Login successful, welcome ${user.fullName}`,
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        },
        token: token
    });
}


const logoutUser = async (req, res) => {
    // console.log('working')

    await userModel.findByIdAndUpdate(req.user._id, { token: null });

    // Clear the cookie
    res.clearCookie('token')
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

