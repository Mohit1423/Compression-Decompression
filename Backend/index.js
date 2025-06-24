import 'dotenv/config';
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from './utils/db.js';
import userRoutes from './/routes/user.routes.js';



const app = express();
const port= process.env.PORT || 4000;

const corsOptions = {
    origin: "http://localhost:5173",
    credentials:true,
    exposedHeaders: ["Content-Disposition"], 
}

// //Middleware
app.use(cors(corsOptions)); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes
app.use('/api/v1/user',userRoutes);




app.listen(port,()=>{
    connectDB()
    console.log(`Server is running on port ${port}`)
    
})