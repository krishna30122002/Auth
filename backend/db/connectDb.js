import mongoose from "mongoose";

export const connectDb=async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error connecting MongoDB: ", error.message);
        process.exit(1); // failure, 0 for success
    }
}