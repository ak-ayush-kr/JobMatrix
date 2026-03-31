import express from "express";
import {postJob,getAllJobs,getJobById,getAdminJobs,updateJob} from "../controllers/job.controller.js";
import getUser from "../middleware/auth.js";
const router=express.Router();

router.post("/postJob",getUser,postJob);
router.get("/getAllJobs",getUser,getAllJobs);
router.get("/getJobById/:id",getUser,getJobById);
router.get("/getAdminJobs",getUser,getAdminJobs);
router.get("/updateJob/:id",getUser,updateJob);

export default router;
