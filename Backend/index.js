import 'dotenv/config';
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from './utils/db.js';



const app = express();
const port= process.env.PORT || 3000;

const corsOptions = {
    origin: "http://localhost:5173",
    credentials:true,

}

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions)); 


//Routes





app.listen(port,()=>{
    connectDB()
    console.log(`Server is running on port ${port}`)
    
})