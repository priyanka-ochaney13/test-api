import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signup = async (req, res, next) => {
    // Signup logic here
    const session = await mongoose.startSession(); //
    session.startTransaction(); 
    try {
        // logic to create user
        const { name, email, password} = req.body;
        //check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create([{ name, email, password: hashedPassword }], { session });

        const token = jwt.sign({userId: newUser[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ 
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUser[0],
            }
         });

    } catch(error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const signin = async (req, res, next) => {
    // signin logic here 
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if (!user) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const error = new Error('Invalid password');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
        res.status(200).json({ 
            success: true,
            message: 'User signed in successfully',
            data: {
                token,
                user,
            }
        });
    } catch(error) {
        next(error);
    }
}

export const signout = async (req, res, next) => {
    // signout logic here
    
}