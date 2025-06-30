import { generateToken } from "../lib/utils.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { fullName, email, password, bio } = req.body;
    try {
        if (!fullName || !email || !password || !bio) {
            return res.json({ success: false, message: "Missing Details" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.json({ success: false, message: "Email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            fullName, email, password: hashedPassword, bio
        });
        const token = generateToken(newUser._id);
        res.json({ success: true, userData: newUser, token, message: "Account Created Successfully" });
    } catch (error) {
        console.error("Signup error:", error);
        res.json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, userData.password);
        if (!isPasswordCorrect) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }
        const token = generateToken(userData._id);
        res.json({ success: true, userData, token, message: "Login Successful" });
    } catch (error) {
        console.error("Login error:", error);
        res.json({ success: false, message: error.message });
    }
};

//controller is usr authenticated

export const checkAuth = (req , res)=>{
    res.json({success:true , user :req.user});
}


//update user profile details

export const updateProfile = async (req, res) => {
    try {
        const { profilePic, bio, fullName } = req.body;
        const userId = req.user._id;
        let updateUser;
        if (!profilePic) {
            updateUser = await User.findByIdAndUpdate(
                userId,
                { bio, fullName },
                { new: true }
            );
        } else{
            const upload = await cloudinary.uploader.upload(profilePic);
            updateUser = await User.findByIdAndUpdate(userId , {profilePic : upload.secure_url , bio , fullName},{new :true});
        }
        
        res.json({ success: true, user: updateUser, message: "Profile updated successfully" });
    } catch (error) {
        console.error("Update profile error:", error);
        res.json({ success: false, message: error.message });
    }
};