"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function auth(req, res, next) {
    const token = req.header("x-auth-token");
    if (!token)
        return res.status(404).send("Access denied, no token provided");
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.get("jwtPrivateKey"));
        req.user = decoded;
        next();
    }
    catch (ex) {
        res.status(400).send("invalid token");
    }
}
exports.default = auth;
