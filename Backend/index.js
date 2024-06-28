const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");
const userRoutes = require("./Routes/user.routes");

const { errorHandler } = require("./Middleware/errorHandler");
const app = express();
dotenv.config();

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://netflix-full-stack-smoky.vercel.app",
    ],
    credentials: true,
    // methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    // allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
const PORT = process.env.PORT || 10000;
const mongoDbConnection = process.env.MONGODBCONNECTION;

mongoose
    .connect(mongoDbConnection)
    .then(() => console.log("MongoDB Connection Stablish Successfully"))
    .catch(() => console.log("Error while connecting mongoDB"));

app.use("/api/v1/user", userRoutes);

app.use("/*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Path Not Found!",
    });
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running and Up port ${PORT}`));

module.exports = app;
