import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import songRoutes from "./routes/songRoutes.js";
import albumRoutes from "./routes/albumRoutes.js";
import statRoutes from "./routes/statRoutes.js";

import { connectDB } from "./lib/db.js";


dotenv.config();


const app = express();
const PORT = process.env.PORT;




app.use("/api/users" , userRoutes);
app.use("/api/auth" , authRoutes);
app.use("/api/admin" , adminRoutes);
app.use("/api/songs" , songRoutes);
app.use("/api/albums" , albumRoutes);
app.use("/api/stats" , statRoutes);


app.listen(PORT , () => {  
    console.log(`Server is Running on ${PORT} `)
    connectDB();
})