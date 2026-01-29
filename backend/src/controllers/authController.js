import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        //Validate

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please provide all required fields",
            });
        }

        //If user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists!",
            });
        }

        //create new user
        const user = await User.create({
            username,
            email,
            password,
        });

        res.status(201).json({
            message: "User registered successfully",
            userId: user._id,
        });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({
            message: " Server error during registration",
        });
    }
};

export const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;

        //Validate
        if(!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        //Find user
        console.log("Login attempt for email:", email);
        const user = await User.findOne({email});
        console.log("User found:", !!user);
        if(!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        //Compare password
        const isMatch = await user.comparePassword(password);
        if(!isMatch) {
            return res.status(401).json({
                message: "Invalid password",
            });
        } 

        //Generate JWT
        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error during login",

        });
            
    }
};


