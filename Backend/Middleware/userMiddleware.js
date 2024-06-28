const dotenv = require('dotenv');
dotenv.config();
const jwtSecretKey = process.env.SECRETE_KEY;
const jwt = require('jsonwebtoken');
const userModel = require('../Models/user.model');

// const authenticateUser = async (req, res, next) => {
//     // const token = req.cookies.token;
//     const headers = req.headers;
//     const tokenFromHeaders = headers.authorization.split(" ")[1];

//     /**
//      * Points to be validated in token
//      * 1. Token should be present
//      * 2. Secret key validation (This is the same token that we have generated)
//      * 3. Token expiry date should not be passed
//      * 4. Validate the issued at date (Optional)
//      * 5. Validate the user id if it is present in database
//      */

//     // 1. Check if token is present
//     if (!tokenFromHeaders) {
//         return res.status(401).json({
//             success: false,
//             message: 'Unauthorized: No token provided'
//         });
//     }

//     // 2. Verify token with secret key
//     try {
//         tokenData = jwt.verify(tokenFromHeaders, jwtSecretKey);
//     } catch (err) {
//         return res.status(401).json({
//             success: false,
//             message: 'Unauthorized: Invalid token'
//         });
//     }

//     const tokenData = jwt.decode(tokenFromHeaders);

//     // 3. Check token expiry
//     const current = Math.floor(Date.now() / 1000); // Current time in seconds
//     if (current > tokenData.exp) {
//         return res.status(401).json({
//             success: false,
//             message: 'Unauthorized: Token has expired'
//         });
//     }

//     // 4. Check token issuance date (Optional)
//     const maxTokenAge = 60 * 60 * 27 * 7; // 7 days in seconds
//     if (current - tokenData.iat > maxTokenAge) {
//         return res.status(401).json({
//             success: false,
//             message: 'Unauthorized: Token too old'
//         });
//     }

//     // 5. Validate user ID
//     try {
//         const user = await userModel.findById(tokenData.userId);
//         if (!user) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'Unauthorized: User not found'
//             });
//         }
//         req.user = user;
//     } catch (err) {
//         return res.status(500).json({
//             success: false,
//             message: 'Internal Server Error'
//         });
//     }

//     // Proceed to the next middleware
//     next();
// };

const authenticateUser = async (req, res, next) => {
    // Get the token from the headers
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: No token provided'
        });
    }

    /**
     * Points to be validated in token
     * 1. Token should be present
     * 2. Secret key validation (This is the same token that we have generated)
     * 3. Token expiry date should not be passed
     * 4. Validate the issued at date (Optional)
     * 5. Validate the user id if it is present in database
     */

    const tokenFromHeaders = authHeader.split(" ")[1];
    if (!tokenFromHeaders) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Invalid token format'
        });
    }

    let tokenData;
    // Verify token with secret key
    try {
        tokenData = jwt.verify(tokenFromHeaders, jwtSecretKey);
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Invalid token'
        });
    }

    // Check token expiry
    const current = Math.floor(Date.now() / 1000); // Current time in seconds
    if (current > tokenData.exp) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Token has expired'
        });
    }

    // Check token issuance date (Optional)
    const maxTokenAge = 60 * 60 * 24 * 7; // 7 days in seconds
    if (current - tokenData.iat > maxTokenAge) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: Token too old'
        });
    }

    // Validate user ID
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
