import express from "express";

import { Request, Response } from "express";
import User from "../schemas/userSchema";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";

export const logUser = async (req: Request, res: Response) => {
  try {
    const validatedData = req.body;

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }
    const validPassword = await bcryptjs.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password");

    const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
    // res.send("Success");
    res.send(token);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
