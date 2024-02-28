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
exports.deleteTodo = exports.completeTodo = exports.updateTodo = exports.createTodo = exports.findTodos = void 0;
const todoSchema_1 = __importDefault(require("../schemas/todoSchema"));
const findTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alltodos = yield todoSchema_1.default.find({ user: req.user._id });
        res.json(alltodos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.findTodos = findTodos;
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const todoData = {
        title: title,
        completed: false,
        time: Date.now(),
        user: req.user._id,
    };
    try {
        const createdTodo = yield saveTodoToDatabase(todoData);
        res.status(201).json(createdTodo);
    }
    catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).send("Internal Server Error");
    }
});
exports.createTodo = createTodo;
const saveTodoToDatabase = (todoData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todo = new todoSchema_1.default(todoData);
        const createdTodo = yield todo.save();
        return createdTodo;
    }
    catch (error) {
        console.error("Error saving todo to the database:", error);
        throw new Error("Error saving todo to the database");
    }
});
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const foundTodo = yield todoSchema_1.default.findOne({ _id: id, user: req.user._id });
        if (!foundTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        foundTodo.title = title;
        const updatedTodo = yield foundTodo.save();
        res.status(200).json(updatedTodo);
    }
    catch (error) {
        console.error("Error updating todo:");
        res.status(500).send("Internal Server Error");
    }
});
exports.updateTodo = updateTodo;
const completeTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const foundTodo = yield todoSchema_1.default.findOne({ _id: id, user: req.user._id });
        if (!foundTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        foundTodo.completed = true;
        const updatedTodo = yield foundTodo.save();
        res.status(200).json(updatedTodo);
    }
    catch (error) {
        console.error("Error updating todo:");
        res.status(500).send("Internal Server Error");
    }
});
exports.completeTodo = completeTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const foundTodo = yield todoSchema_1.default.findOne({ _id: id, user: req.user._id });
        if (!foundTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        yield todoSchema_1.default.findByIdAndDelete(id);
        res.status(200).send("Deleted a todo");
    }
    catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).send("Internal Server Error");
    }
});
exports.deleteTodo = deleteTodo;
