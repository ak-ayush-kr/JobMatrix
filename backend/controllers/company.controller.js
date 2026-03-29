import {Company} from "../models/company.js";

//registering company by name and user id
export const registerCompany=async(req,res)=>{
    try{
        const {companyName,id}=req.body;

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
        if(!id){
            console.log("user not found");
        }
        //create company
        let company=await Company.create({
            name:companyName,
            owner:id
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