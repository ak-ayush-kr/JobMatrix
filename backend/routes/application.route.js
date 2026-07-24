import express from "express";
import { 
    applyToJob,
    getAppliedJobs,
    getApplicants,
    updateStatus,
    getApplicationStatus,
    getKitToken,
  
} from "../controllers/application.controller.js";
import { scheduleInterview } from "../controllers/company.controller.js";

import getUser from "../middleware/auth.js";    
const router = express.Router();

router.post("/apply/:jobId", getUser, applyToJob);
router.get("/appliedJobs", getUser, getAppliedJobs);
router.get("/applicants/:jobId", getUser, getApplicants);
router.get("/status/:jobId", getUser, getApplicationStatus);
router.put("/updateStatus/:id", getUser, updateStatus);
// router.put(
//    "/scheduleInterview/:id",
//    getUser,
//    scheduleInterview
// );
router.get("/gettoken/:roomid",getUser,getKitToken);
router.post("/scheduled",getUser,scheduleInterview);


export default router;