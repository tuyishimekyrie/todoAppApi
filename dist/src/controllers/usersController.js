"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = exports.createUser = void 0;
const userSchema_1 = __importDefault(require("../schemas/userSchema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = req.body;
        let existingUser = yield userSchema_1.default.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).send("User with this email already registered");
        }
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, salt);
        existingUser = new userSchema_1.default({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            isAdmin: req.body.isAdmin,
        });
        yield existingUser.save();
        const token = jsonwebtoken_1.default.sign({ _id: existingUser._id }, config_1.default.get("jwtPrivateKey"));
        res.header("x-auth-token", token).status(201).send({
            name: existingUser.name,
            email: existingUser.email,
            password: existingUser.password,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
exports.createUser = createUser;
const currentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userSchema_1.default.findById(req.user._id).select("-password");
    res.send(user);
});
exports.currentUser = currentUser;
