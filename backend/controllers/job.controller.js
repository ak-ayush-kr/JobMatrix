import {Application} from "../models/application.js";
import { Job } from "../models/job.js";
import { Application } from "../models/application.js";
export const postJob = async (req, res) => {
  try {
    const { title,description,requirements,salary,location,jobType,experience,position,companyId} = req.body;
    const userId = req.user.id;

    if ( !title || !description || !requirements || !salary || !location || !jobType || !experience || position == null || !companyId || !userId) {
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

    const jobs = await Job.find(query)
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
    const job = await Job.findById(jobId).populate("applications").populate("company");

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
    const jobs = await Job.find({ "applications.applicant": userId })
      .populate("company");
    
    const result = jobs.map(job => {
      const application = job.applications.find(app => app.applicant.toString() === userId);
      return { 
        ...job._doc,
        applicationStatus: application ? application.status : "N/A" 
      }
    });
    return res.status(200).json({message:"Applied jobs fetched successfully", jobs: result});
  } catch (error) {
    console.log("error while fetching users jobs",error);
    return res.status(500).json({message:"server error while fetching applied jobs"});
  }
}