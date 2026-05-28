import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({

    job : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Job',
        required : true
    },

    applicant : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },

    status : {
        type : String,
        enum : [
            'pending',
            'shortlisted',
            'interview_scheduled',
            'accepted',
            'rejected'
        ],
        default : 'pending'
    },

    recruiterMessage : {
        type : String,
        default : ""
    },

    interviewDate : {
        type : Date
    },
        interviewTime : {
            type : String
        },

        interviewMode : {
            type : String
        },
    interviewRoomId : {
        type : String,
        default : ""
    }

},{timestamps : true});

export const Application = mongoose.model("Application", applicationSchema);