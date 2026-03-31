
import jwt from "jsonwebtoken";
import {User} from "../models/user.js";

const getUser = async (req, res, next) => {
    console.log("middleware has been called");
    try {
        const accessToken = await req.cookies?.token || req.header("Authorization")?.replace("Bearer ","") || req.body.token;
        console.log(accessToken);
        if(!accessToken){
            return res.status(401).json({ message: "Unauthorized request" });
        }
        try{
        const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
        console.log("token data is: ",decodedToken);
        req.user=decodedToken;
        }
        catch(e){
            return res.status(401).json({
                success:false,
                message:"token invalid"
            })
        }

        /*const user = await User.findById(decodedToken.id).select("-password");
        if(!user){
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;*/
        next();
    } catch (error) {
        console.error("Error in getUser middleware:", error);
        return res.status(401).json({ message: "Invalid access token" });
    }
}

export default getUser;