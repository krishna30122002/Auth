import express from "express";
import dotenv from "dotenv";

import { connectDb } from "./db/connectDb.js";
import authRoutes from "./routes/authRoute.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res)=>{
    res.send('Hello World!');
})

app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(5000, ()=>{
    connectDb();
    console.log(`Server is running on port ${PORT}`)
})