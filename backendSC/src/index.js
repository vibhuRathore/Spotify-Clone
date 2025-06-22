import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from '@clerk/express';
import fileUpload from 'express-fileupload';
import path from "path";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import songRoutes from "./routes/songRoutes.js";
import albumRoutes from "./routes/albumRoutes.js";
import statRoutes from "./routes/statRoutes.js";

import { connectDB } from "./lib/db.js";


dotenv.config();


const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(clerkMiddleware());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : path.join(__dirname,"temp"),
    createParentPath : true,
    limits : {
        fileSize : 10 * 1024 * 1024
    }
}));


app.use("/api/users" , userRoutes);
app.use("/api/auth" , authRoutes);
app.use("/api/admin" , adminRoutes);
app.use("/api/songs" , songRoutes);
app.use("/api/albums" , albumRoutes);
app.use("/api/stats" , statRoutes);

app.use((error , req , res , next) => {
    res.status(500).json({ message : process.env.NODE_ENV === "production" ? "Internal Server Error" : error.message});
})


app.listen(PORT , () => {  
    console.log(`Server is Running on ${PORT} `)
    connectDB();
})