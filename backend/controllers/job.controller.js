import { Job } from "../models/job.js";
import { Application } from "../models/application.js";
import { getSkillsFromDescription } from "../actions/getSkillFunction.js";
import { jobProcessing } from "../actions/findMatchingUser.js";
import { User } from "../models/user.js";
import { Noticification } from "../models/noticification.js";
import { io, getReceiverSocketId } from "../utils/socket.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.user.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || position == null || !companyId || !userId) {
            return res.status(400).json({
                message: "Fill the complete form ",
                success: false,
            });
        }
        console.log(userId);
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position: Number(position),
            company: companyId,
            created_by: userId,
        });

        console.log("working here");
        jobProcessing(job);
        const notice = await Noticification.create({
            title:"New job has been posted",
            message:`${title} job aa gyi job aa gyi`,
            relatedJob: job._id,
        });

        const socketId = getReceiverSocketId(userId);

        if(socketId){
            io.to(socketId).emit(
                "newNotification",notice
            )
        }
        return res.status(201).json({
            message: "job created successfully.",
            job,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error while creating job.",
            success: false,
        });
    }
};

export const getAllJobs = async (req, res) => {
    try {

     

        const keyword = req.query.keyword || "";

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        };

        const jobs = await Job.find({
            ...query,
            isClosed : false
        })
            .populate("company")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            jobs,
            success: true,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Server error while fetching jobs.",
            success: false,
        });
    }
};

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
            populate: {
                path: "applicant",
            }
        }).populate("company");;

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false,
            });
        }

        return res.status(200).json({
            job,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error while fetching job.",
            success: false,
        });
    }
};

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.user.id;
        const jobs = await Job.find({ created_by: adminId })
            .populate("company")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            jobs,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error while fetching admin jobs.",
            success: false,
        });
    }
};

export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const {
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            experience,
            position,
            companyId,
        } = req.body;

        if (
            !title ||
            !description ||
            !requirements ||
            !salary ||
            !location ||
            !jobType ||
            !experience ||
            position == null ||
            !companyId
        ) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false,
            });
        }

        const updateData = {
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position: Number(position),
            company: companyId,
        };

        const job = await Job.findByIdAndUpdate(jobId, updateData, { new: true });
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Job updated successfully.",
            job,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error while updating job.",
            success: false,
        });
    }
};


export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.user.id;
        const applications = await Application.find({
            applicant: userId
        })
            .populate({
                path: "job",
                populate: {
                    path: "company"
                }
            });

        const result = applications.map((app) => ({

    ...app.job._doc,

    applicationStatus: app.status,

    recruiterMessage: app.recruiterMessage,

    interviewDate: app.interviewDate,

    interviewTime: app.interviewTime,

    interviewMode: app.interviewMode,

    interviewDetails:
        app.interviewDate
            ? `Date: ${app.interviewDate}
Time: ${app.interviewTime || "Not specified"}
Mode: ${app.interviewMode || "Not specified"}`
            : ""

}));
        return res.status(200).json({ message: "Applied jobs fetched successfully", jobs: result });
    } catch (error) {
        console.log("error while fetching users jobs", error);
        return res.status(500).json({ message: "server error while fetching applied jobs" });
    }
}

export const getMyJob = async (req,res)=>{

    try {

        const userId = req.user.id;

        const user = await User.findById(userId);

        // user has no job
        if(!user.currentJob){

            return res.status(404).json({
                message : "No active job",
                success : false
            });
        }

        const job = await Job.findById(user.currentJob)
        .populate("company");

        if(!job){

            return res.status(404).json({
                message : "Job not found",
                success : false
            });
        }

        return res.status(200).json({
            job,
            success : true
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message : "Server error",
            success : false
        });
    }
}
export const deleteJob = async (req,res)=>{

    try {

        const jobId = req.params.id;

        const job = await Job.findById(jobId);

        if(!job){

            return res.status(404).json({
                message : "Job not found",
                success : false
            });
        }

        // security check
        if(
            job.created_by.toString()
            !== req.user.id
        ){
            return res.status(403).json({
                message : "Unauthorized",
                success : false
            });
        }

        // delete all related applications
        await Application.deleteMany({
            job : jobId
        });

        // delete job
        await Job.findByIdAndDelete(jobId);

        return res.status(200).json({
            message : "Job deleted successfully",
            success : true
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message : "Server error",
            success : false
        });
    }
}