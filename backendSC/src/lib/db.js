import mongoose from "mongoose";




export const connectDB = async () => {
    try {
        const result  = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to DB ${result.connection.host}`)
    } catch (error) {
        console.log("Connection Failed" , error);
        process.exit(1);
    }
}