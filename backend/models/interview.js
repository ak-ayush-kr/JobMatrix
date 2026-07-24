import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
    {
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
    jobDetail:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required: true,
    },
    scheduledAt: {
        type: Date,
        required: true
    },
    code:{
        type: String,
        required: true
    }
  },{timestamps:true}
);

export const Interview = mongoose.model("Interview", interviewSchema);