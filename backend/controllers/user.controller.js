import { User } from "../models/user.js";
import bcrypt from 'bcryptjs';
import cloudinary from "../utils/cloudinary.js";
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, role } = req.body;

        if (!name || !email || !password || !phoneNumber || !role) {
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
            profile: profileData,
        });

        const saveduser = await user.save();
        saveduser.password = undefined;

        return res.status(201).json({
            message: 'User registered successfully',
            user: saveduser
        });

    } catch (error) {
        console.error('Error in user registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        let user = await User.findOne({ email, role });
        if (!user) {
            return res.status(400).json({ message: 'user not registered' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'wrong password' });
        }
        const payload = {
            email: user.email,
            id: user._id,
            role: user.role
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
        user = user.toObject();
        user.token = token;
        user.password = undefined;

        const options = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            sameSite: "lax",
            path: "/",
            secure: false,
            domain: "localhost",
            httpOnly: true
        };

        let userDetails = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, options).json({
            message: 'Login successful',
            userDetails,
        });
    } catch (error) {
        console.error('Error in user login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, phoneNumber, bio, skills } = req.body;

        let updateData = {}
        if (name) updateData['name'] = name;
        if (phoneNumber) updateData['profile.phoneNumber'] = phoneNumber;
        if (bio) updateData['profile.bio'] = bio;
        if (skills) updateData['profile.skills'] = skills.split(',').map(s => s.trim());

        if (req.files?.profilePhoto) {
            const file = req.files.profilePhoto[0];

            const b64 = Buffer.from(file.buffer).toString("base64");
            const dataURI = `data:${file.mimetype};base64,${b64}`;

            const uploadResult = await cloudinary.uploader.upload(dataURI, {
                folder: "jobmatrix/profile",
            });

            updateData["profile.profilePhoto"] = uploadResult.secure_url;
        }
        if (req.files?.resume) {
            const file = req.files.resume[0];
            console.log("Uploading resume:");

            const b64 = Buffer.from(file.buffer).toString("base64");
            const dataURI = `data:${file.mimetype};base64,${b64}`;

            const uploadResult = await cloudinary.uploader.upload(dataURI, {
                folder: "jobmatrix/resume",
                resource_type: "raw",
            });

            updateData["profile.resume"] = uploadResult.secure_url;
            updateData["profile.resumeName"] = file.originalname;
        }

        const updatedUser = await User.findByIdAndUpdate(userId, { $set: updateData }, { new: true }).select('-password');
        return res.status(200).json({
            message: 'Profile updated successfully',
            user: updatedUser
        });

    } catch (error) {
        console.log("Error in updating profile:", error);
        res.status(500).json({ message: 'Server error' });
    }
}