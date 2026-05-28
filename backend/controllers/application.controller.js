import { Application } from "../models/application.js";
import { Job } from "../models/job.js";
import { User } from "../models/user.js";
import {
    sendApplicationStatusEmail,
    transporter
} from "../actions/sendEmail.js";
export const applyToJob = async (req, res) => {

    try {

        const { jobId } = req.params;
        const applicantId = req.user.id;

        const user = await User.findById(applicantId);
        // resume check
        if(!user.profile?.resume){
            return res.status(400).json({
                message : "Upload resume first before applying",
                success : false
            });
        }
        // already employed
        if(user.isEmployed){
            return res.status(400).json({
                message : "You already have a job",
                success : false
            });
        }

        const existingApplication = await Application.findOne({
            job : jobId,
            applicant : applicantId
        });

        if(existingApplication){
            return res.status(400).json({
                message : "Already applied",
                success : false
            });
        }

        const job = await Job.findById(jobId);

        if(!job){
            return res.status(404).json({
                message : "Job not found",
                success : false
            });
        }

        // closed job
        if(job.isClosed){
            return res.status(400).json({
                message : "Job is closed",
                success : false
            });
        }

        const application = await Application.create({
            job : jobId,
            applicant : applicantId
        });

        job.applications.push(application._id);

        await job.save();

        return res.status(201).json({
            message : "Applied successfully",
            application,
            success : true
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message : "Server error",
            success : false
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

        const { status } = req.body;

        const applicationId = req.params.id;

        const application = await Application.findById(applicationId)
        .populate("applicant")
        .populate({
            path : "job",
            populate : {
                path : "company"
            }
        });

        if(!application){
            return res.status(404).json({
                message : "Application not found",
                success : false
            });
        }

        // SECURITY CHECK
        if(
            application.job.created_by.toString()
            !== req.user.id
        ){
            return res.status(403).json({
                message : "Unauthorized",
                success : false
            });
        }

        application.status = status;

        await application.save();

        // SEND EMAIL
        await sendApplicationStatusEmail({
            to : application.applicant.email,
            userName : application.applicant.name,
            companyName : application.job.company.name,
            jobTitle : application.job.title,
            status
        });

        // IF ACCEPTED
        if(status === "accepted"){

            const user = await User.findById(
                application.applicant._id
            );

            user.currentJob = application.job._id;

            user.isEmployed = true;

            await user.save();

            // close job
            const job = await Job.findById(
                application.job._id
            );

            job.isClosed = true;

            await job.save();
        }

        return res.status(200).json({
            message : `Application ${status}`,
            success : true
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message : "Server error",
            success : false
        });
    }
};
export const getApplicationStatus = async (req,res)=>{
    try {

        const { jobId } = req.params;

        const applicantId = req.user.id;

        const application = await Application.findOne({
            job : jobId,
            applicant : applicantId
        });

        // user has not applied
        if(!application){
            return res.status(200).json({
                applied : false,
                success : true
            });
        }

        // user has applied
        return res.status(200).json({
            applied : true,
            status : application.status,
            application,
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
export const scheduleInterview = async (req,res)=>{

    try {

                const {
            interviewDate,
            interviewTime,
            interviewMode,
            recruiterMessage
        } = req.body;

        const applicationId = req.params.id;

        if(!interviewDate || !interviewTime){
            return res.status(400).json({
                message : "Interview date required",
                success : false
            });
        }

        const application = await Application.findById(applicationId)
        .populate("applicant")
        .populate({
            path : "job",
            populate : {
                path : "company"
            }
        });

        if(!application){
            return res.status(404).json({
                message : "Application not found",
                success : false
            });
        }

        // recruiter security check
        if(
            application.job.created_by.toString()
            !== req.user.id
        ){
            return res.status(403).json({
                message : "Unauthorized",
                success : false
            });
        }

        // room id generation
        const roomId = `room_${Date.now()}`;

        application.interviewDate = interviewDate;

        application.interviewTime = interviewTime;

        application.interviewMode = interviewMode;

        application.interviewRoomId = roomId;

        application.recruiterMessage =
            recruiterMessage ||
            `Interview scheduled on ${interviewDate} at ${interviewTime}`;

        application.status = "interview_scheduled";
        await application.save();
        const mailOptions = {

            from : process.env.EMAIL_USER,

            to : application.applicant.email,

            subject : `Interview Scheduled - ${application.job.title}`,

            html : `
                <div>
                    <h2>Hello ${application.applicant.name}</h2>

                    <p>Your interview has been scheduled.</p>

                    <h3>Interview Details</h3>

                    <p>
                        <b>Company:</b>
                        ${application.job.company.name}
                    </p>

                    <p>
                        <b>Role:</b>
                        ${application.job.title}
                    </p>

                    <p>
                        <b>Date:</b>
                        ${interviewDate}
                    </p>

                    <p>
                        <b>Time:</b>
                        ${interviewTime}
                    </p>

                    <p>
                        <b>Mode:</b>
                        ${interviewMode}
                    </p>

                    <p>
                        ${recruiterMessage || ""}
                    </p>

                    <br/>

                    <p>
                        Regards,
                        <br/>
                        JobMatrix Team
                    </p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({
            message : "Interview scheduled successfully",
            roomId,
            application,
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