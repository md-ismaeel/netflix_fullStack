const dotenv = require('dotenv');
dotenv.config();
const jwtSecretKey = process.env.SECRETE_KEY; // Corrected Typo
const jwt = require('jsonwebtoken');
const userModel = require('../Models/user.model');

const authenticateUser = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: No token provided'
        });
    }

    try {
        const decoded = jwt.verify(token, jwtSecretKey);
        const user = await userModel.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized: Invalid token'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Invalid token'
        });
    }
};

module.exports = { authenticateUser };
