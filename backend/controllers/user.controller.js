import { User } from "../models/user.js";
import bcrypt from 'bcryptjs';
import cloudinary from "../utils/cloudinary.js";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const{name, email, password, phoneNumber, role } = req.body;

        if(!name || !email || !password || !phoneNumber || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        let profileData = {};

        if (req.file) {
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            const dataURI = `data:${req.file.mimetype};base64,${b64}`;

            const uploadResult = await cloudinary.uploader.upload(dataURI, {
                folder: "jobmatrix_profiles",
            });

            profileData.profilePhoto = uploadResult.secure_url;
        }

        const user = new User({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            role,
            profile:profileData,
        }); 

        const saveduser = await user.save();
        saveduser.password = undefined;

        return res.status(201).json({
            message: 'User registered successfully',
            user: saveduser
        });

    }catch (error) {
        console.error('Error in user registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


export const login = async (req, res) => {
    try {
        const {email, password,role} = req.body;
        if(!email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        let user = await User.findOne({ email, role });
        if (!user) {
            return res.status(400).json({ message: 'user not registered' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: 'wrong password' });
        }
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        user.token = token;
        user.password = undefined;

        const options = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            sameSite: "lax",
            pqth: "/",
            secure: false,
            domain: "localhost"
        };
        console.log(token);

        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", user.token, options).json({
            message: 'Login successful',
            user,
        }); 
    } catch (error) {
        console.error('Error in user login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};