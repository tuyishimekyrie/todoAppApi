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

   
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);


    existingUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
        isAdmin: req.body.isAdmin,
     
    });

 
    await existingUser.save();

    
    const token = jwt.sign({ _id: existingUser._id }, config.get("jwtPrivateKey"));

    
    res.header("x-auth-token", token).status(201).send({
      name: existingUser.name,
      email: existingUser.email,
      password: existingUser.password,
    });
  } catch (error) {
   
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const currentUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
};
