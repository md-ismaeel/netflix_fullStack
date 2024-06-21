const dotenv = require('dotenv');
dotenv.config();
const jwtSecretKey = process.env.SECRETE_KEY; // Corrected Typo
const jwt = require('jsonwebtoken');
const userModel = require('../Models/user.model');

const authenticateUser = async (req, res, next) => {
    const token = req.cookies.token;

    /**
     * Points to be validated in token
     * 1. Token should be present
     * 2. Secret key validation (This is the same token that we have generated)
     * 3. Token expiry date should not be passed
     * 4. Validate the issued at date (Optional)
     * 5. Validate the user id if it is present in database
     */

    console.log(req.cookies);
    // 1. Check if token is present
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: No token provided'
        });
    }

    let tokenData;
    // 2. Verify token with secret key
    try {
        tokenData = jwt.verify(token, jwtSecretKey);
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Invalid token'
        });
    }

    // 3. Check token expiry
    const current = Math.floor(Date.now() / 1000); // Current time in seconds
    if (current > tokenData.exp) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Token has expired'
        });
    }

    // 4. Check token issuance date (Optional)
    const maxTokenAge = 60 * 60 * 27 * 7; // 7 days in seconds
    if (current - tokenData.iat > maxTokenAge) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Token too old'
        });
    }

    // 5. Validate user ID
    try {
        const user = await userModel.findById(tokenData.userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized: User not found'
            });
        }
        req.user = user;
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }

    // Proceed to the next middleware
    next();
};

module.exports = { authenticateUser };
