import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB connected");
    }
    catch(error){
        console.log("DB connection fail ",error)
    }
}

export default connectDB;