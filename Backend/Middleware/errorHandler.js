
const catchAsyncFun = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (err) {
            console.log("ERROR OCCURRED", err);
            next(err);
        }
        // Promise.resolve(fn(req, res, next)).catch((err) => {
        //   next(err);
        // });
    };
}


const errorHandler = async (err, req, res, next) => {
    console.log("common error handler");

    res.json({
        success: false,
        message: "Something went wrong, please try again after sometime",
    });
}



module.exports = { catchAsyncFun, errorHandler };