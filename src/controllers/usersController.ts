import { Request, Response } from "express";
import User from "../schemas/userSchema";
import bcryptjs from "bcryptjs";
import _ from "lodash";
import jwt from "jsonwebtoken";
import config from "config";

export const createUser = async (req: Request, res: Response) => {
  try {
    const validatedData = req.body;

    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send("User with this email already registered");
    }

    // Generate salt and hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    // Create a new user instance
    existingUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
        isAdmin: req.body.isAdmin,
     
    });

    // Save the user to the database
    await existingUser.save();

    // Generate JWT token
    const token = jwt.sign({ _id: existingUser._id }, config.get("jwtPrivateKey"));

    // Set the token in the response header and send user details
    res.header("x-auth-token", token).status(201).send({
      name: existingUser.name,
      email: existingUser.email,
      password: existingUser.password,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const currentUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
};
