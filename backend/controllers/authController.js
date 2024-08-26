import { User } from "../models/user.js";
import bcryptjs from "bcryptjs";
import { generateTokenSetCookie } from "../utils/generateTokenSetCookie.js";

export const signup = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        if (!email || !password || !name) {
            throw new Error("All fields are required!");
        }
        if (password.length < 6) {
            throw new Error("Password must not be less than 6 Characters");
        }

        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res
                .status(400)
                .json({ success: false, message: "User already exists!" });
        }

        const verificationToken = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        });
        await user.save();

        generateTokenSetCookie(res, user._id);

        res.status(201).json({
            success:true,
            message:"User created successfully",
            user:{
                ...user._doc,
                password: undefined,
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const login = async (req, res) => {
    res.send("Signup");
};

export const logout = async (req, res) => {
    res.send("Signup");
};
