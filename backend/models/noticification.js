import mongoose from "mongoose";

const noticificationSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required: true,
    },
    relatedJob:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
    },   
},{timestamps:true});

export const Noticification = mongoose.model('Noticification',noticificationSchema);