import config from "config";
import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(404).send("Access denied, no token provided");
  try {
    const decoded : any = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex: any) {
    res.status(400).send("invalid token");
  }
}

export default auth;
