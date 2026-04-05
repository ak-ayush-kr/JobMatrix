import express from "express";
import { applyToJob, getAppliedJobs, getApplicants, updateStatus } from "../controllers/application.controller.js";
import getUser from "../middleware/auth.js";    
const router = express.Router();

router.post("/apply/:jobId", getUser, applyToJob);
router.get("/appliedJobs", getUser, getAppliedJobs);
router.get("/applicants/:jobId", getUser, getApplicants);
router.put("/updateStatus/:id", getUser, updateStatus);

export default router;