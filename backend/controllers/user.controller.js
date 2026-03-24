import { User } from "../models/user.js";
import bcrypt from 'bcryptjs';
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
        const user = new User({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            role
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
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: 'Login successful',
            user,
        }); 
    } catch (error) {
        console.error('Error in user login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};