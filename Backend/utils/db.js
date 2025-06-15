import mongoose from "mongoose";
import 'dotenv/config';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
    } catch (error) {
        console.log(error.message);
        
    }
}

export default connectDB