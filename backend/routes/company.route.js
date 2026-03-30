import express from "express";
import {registerCompany,getCompany,getCompanyById,updateCompany} from "../controllers/company.controller.js";
import getUser from "../middleware/auth.js";
import {upload} from "../middleware/multer.js"
const router=express.Router();

router.post("/registerCompany",getUser,registerCompany);
router.get("/getCompany",getUser,getCompany);
router.get("/getCompanyById/:id",getUser,getCompanyById);
router.put("/updateCompany/:id",getUser,upload.single("file"),updateCompany);

export default router;