const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const studentRoutes = require('./routes/studentroutes');
const authRoutes = require('./routes/authroutes');

//configuring the env file so we can use it here
dotenv.config();

//callig the mongoDB connection function from db.js file
connectDB();

//using our express package as a middleware
const app = express();

//telling express to use the APIs in JSON format
app.use(express.json());
//now enabling the CORS so our APIs can run on another PORT
app.use(cors());

//setting the base url
app.use('/api/student',studentRoutes);
//setting base URL for login signup
app.use('/api/auth',authRoutes)

//fetching our PORT number from .env file
const PORT = process.env.PORT;
//now starting our nodejs server on the port that we have defined in .env file
app.listen(PORT,() => {
    console.log(`Server is running on the ${PORT}`);
})