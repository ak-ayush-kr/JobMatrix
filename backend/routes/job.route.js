import express from "express";
import {
    postJob,
    getAllJobs,
    getJobById,
    getAdminJobs,
    updateJob,
    getAppliedJobs,
    getMyJob,
    deleteJob
} from "../controllers/job.controller.js";
import getUser from "../middleware/auth.js";
const router=express.Router();

router.post("/postJob",getUser,postJob);
router.get("/getAllJobs",getUser,getAllJobs);
router.get("/getJobById/:id",getUser,getJobById);
router.get("/getAdminJobs",getUser,getAdminJobs);
router.put("/updateJob/:id",getUser,updateJob);
router.get("/getAppliedjobs",getUser,getAppliedJobs);
router.get("/myJob",getUser,getMyJob);
router.delete("/deleteJob/:id",getUser,deleteJob);
export default router;
