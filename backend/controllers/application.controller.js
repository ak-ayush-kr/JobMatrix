import { Application } from "../models/application.js";
import { Job } from "../models/job.js";


export const applyToJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const applicantId = req.user.id;

        if (!jobId) {
            return res.status(400).json({ message: "Job ID is required" });
        }

        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: applicantId
        });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied to this job"
            });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        const newApplication = await Application.create({
            job: jobId,
            applicant: applicantId,
        });

        
        job.applications.push(newApplication._id);
        await job.save();

        res.status(201).json({
            message: "Application submitted successfully",
            newApplication,
            success: true
        });

    } catch (error) {
        console.log("Error in applyToJob controller:", error);
        res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.user.id;
        const applications = await Application.find({ applicant: userId }).populate({
            path: "job",
            options: {sort: { createdAt: -1 }},
            populate: { 
                path: "company",
                options: { sort: { createdAt: -1 }}
            }
        });

        if(!applications) {
            console.log("No applications found for user ID:", userId);  
            return res.status(404).json({ message: "No applications found" });
        }

        return res.status(200).json({ 
            message: "Applied jobs fetched successfully",
            applications,
            success: true
        });
    } catch (error) {
        console.log("Error in getAppliedJobs controller:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
}

export const getApplicants = async (req, res) => {
    try {
        const jobID = req.params.jobId;
        const job = await Job.findById(jobID).populate({
            path: "applications",
            options: { sort: { createdAt: -1 }},
            populate: {
                path: "applicant",
            }
        });

        if(!job) {
            console.log("Job not found with ID:", jobID);
            return res.status(404).json({ message: "Job not found" });
        }

        return res.status(200).json({ message: "Applicants fetched successfully", success: true , applicants: job.applications });

    } catch (error) {
        console.log("Error in getApplicants controller:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
}

export const updateStatus = async (req, res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status || !applicationId) {
            console.log("Status and Application ID are required");
            return res.status(400).json({ message: "Status and Application ID are required", success: false });
        }
        
        const application = await Application.findById(applicationId);
        if(!application) {
            return res.status(404).json({ message: "Application not found", success: false });
        }
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({ message: "Application status updated successfully", success: true });
        
    } catch (error) {
        console.log("Error in updateStatus controller:", error);
        res.status(500).json({ message: "Server error" });
    }
}