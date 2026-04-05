import {Company} from "../models/company.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


//registering company by name and user id
export const registerCompany=async(req,res)=>{
    console.log("register company controller called");
    try{
        const {companyName}=req.body;

        if(!companyName){
            return res.status(400).json({
                message:"Enter Comany Name Befor Registrartion",
                success:false
            });
        }

        //check is any company already exist with that name
        let companyExist=await Company.findOne({name:companyName});
        if(companyExist){
            return res.status(400).json({
                message:"Register wit different company name",
                success:false
            });
        }
        if(!req.user.id){
            console.log("user not found");
        }
        //create company
        let company=await Company.create({
            name:companyName,
            userId:req.user.id
        });

        return res.status(201).json({
            message:"Comapny registered successfully",
            data:company,
            success:true
        });
    }
    catch(e){
        console.log(e);
        console.log("Comapny registration failed");
        res.status(500).json({
            success:false,
            data:"error while registring company",
            message:e.message
        })
    }
}

//get all company created by user/recruiter
export const getCompany = async (req, res) => {
    try {
        const userId = req.user.id;
        const companies = await Company.find({userId});
        if(!companies) {
            return res.status(404).json({
                message : "Companies not found.",
                success : false
            });
        }

        return res.status(200).json({
            message:"companies are",
            companies,
            success : true
        })
    } catch (error) {
        console.log(error);
        console.log("Failed while fetching all companies");
        res.status(500).json({
            success:false,
            data:"error while fetching all company",
            message:error.message
        })
    }
};

// get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if(!company) {
            return res.status(404).json({
                message : "Company not found.",
                success : false
            });
        }

        return res.status(200).json({
            message:"company details are",
            company,
            success : "true"
        })
    } catch (error) {
        console.log(error);
        console.log("Comapny details failed to fetch");
        res.status(500).json({
            success:false,
            data:"No company exist with this id or maybe some error",
            message:error.message
        })
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        console.log(name,description,website,location);

        //file is logo image
        const file = req.file;
        const fileUri = getDataUri(file);

        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const logo = cloudResponse.secure_url;

        

        const updateData = {name, description, website, location, logo};

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new : true});
        if(!company) {
            return res.status(404).json({
                message : "Company not found.",
                success : false
            });
        }

        return res.status(200).json({
            message : "Company information updated.",
            success : true
        });
    } catch (error) {
        console.log(error);
        console.log("Error while company detail updation");
        res.status(500).json({
            success:false,
            data:"Error while company detail updation",
            message:error.message
        })
    }
}