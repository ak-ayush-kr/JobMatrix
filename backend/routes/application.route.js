import express from "express";
import { 
    applyToJob,
    getAppliedJobs,
    getApplicants,
    updateStatus,
    getApplicationStatus,
    scheduleInterview
} from "../controllers/application.controller.js";

import getUser from "../middleware/auth.js";    
const router = express.Router();

router.post("/apply/:jobId", getUser, applyToJob);
router.get("/appliedJobs", getUser, getAppliedJobs);
router.get("/applicants/:jobId", getUser, getApplicants);
router.get("/status/:jobId", getUser, getApplicationStatus);
router.put("/updateStatus/:id", getUser, updateStatus);
router.put(
   "/scheduleInterview/:id",
   getUser,
   scheduleInterview
);
export default router;