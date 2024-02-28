"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const todoSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    time: {
        type: Date,
        default: Date.now,
    },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
});
const todoModel = mongoose_1.default.model("Todos", todoSchema);
exports.default = todoModel;
