import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDb.js';
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoutes.js';
import postRoute from './routes/postRoutes.js';
import { v2 as cloudinary } from 'cloudinary';
// env
dotenv.config();
// connectDB
connectDB();

// apper43
const app = express();
const PORT = process.env.PORT || 5000;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// middlewares start
// its a function runs between a request and response
// built-in middleware
// parse the data from incoming data in the req.body
app.use(express.json());
// if objects has the nested objects
app.use(express.urlencoded({ extended: true }));
//
app.use(cookieParser());
// middlewares end

// Routes
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);

app.listen(PORT, () => console.log('helloo'));
