import mongoose from "mongoose";

let isConnected = false;    // to track connection status

export const connectToDB = async () => {
    if(!process.env.MONGODBURL) {
        console.log("MONGODBURL is not defined - skipping database connection");
        return;
    }

    if(isConnected){
        console.log("Using existing database connection");
        return;
    } 

    try {
       await mongoose.connect(process.env.MONGODBURL);
       isConnected = true
       console.log("MONGODB connected");
    } catch (error) {
        console.log("MongoDB connection error:", error);
    }
}