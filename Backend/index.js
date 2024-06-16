const express = require('express');
const dotenv = require('dotenv');

const mongoose = require('mongoose');
const userRoutes = require("./Routes/user.routes")

const { errorHandler } = require("./Middleware/errorHandler")

dotenv.config();

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 10000;

mongoose.connect('mongodb://localhost:27017/Netflix')
    .then(() => console.log('MongoDB Connection Stablish Successfully'))
    .catch(() => console.log('Error while connecting mongoDB'))

app.use('/api/v1/user', userRoutes);

app.use('/*', (req, res) => {

    res.status(404).json({
        success: false,
        message: 'Path Not Found!'
    })
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server is running and Up port ${PORT}`))