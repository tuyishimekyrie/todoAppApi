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
exports.logUser = void 0;
const userSchema_1 = __importDefault(require("../schemas/userSchema"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const logUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = req.body;
        let user = yield userSchema_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send("Invalid email or password");
        }
        const validPassword = yield bcryptjs_1.default.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(400).send("Invalid email or password");
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, config_1.default.get("jwtPrivateKey"));
        // res.send("Success");
        res.send(token);
    }
    catch (error) {
        res.status(500).send("Internal Server Error");
    }
});
exports.logUser = logUser;
