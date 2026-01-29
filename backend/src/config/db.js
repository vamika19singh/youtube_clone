import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Host:", mongoose.connection.host);
        console.log("MongoDB DB name:", mongoose.connection.name);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }

};

export default connectDB;