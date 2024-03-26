import { Request, Response } from "express";
import todos from "../schemas/todoSchema";


export const findTodos = async (req:Request, res:Response) => {
  try {
 
    const alltodos = await todos
      .find({ user: req.user._id })
      .sort({ time: -1 });;
    res.json(alltodos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export const allTodos = async (req: Request, res: Response) => {
  try {
    // Retrieve all todos from the database
    const allTodos = await todos.find().sort({ time: -1 });

    // Send the todos as a response
    res.json(allTodos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createTodo = async (req: Request, res: Response) => {
    
  const { title } = req.body;
  const todoData = {
    title: title,
    completed: false,
    time: Date.now(),
    user: req.user._id,
  };
  try {
    const createdTodo = await saveTodoToDatabase(todoData);
    res.status(201).json(createdTodo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).send("Internal Server Error");
  }
};

const saveTodoToDatabase = async (todoData: any) => {
  try {
    const todo = new todos(todoData);
    const createdTodo = await todo.save();
    return createdTodo;
  } catch (error) {
    console.error("Error saving todo to the database:", error);
    throw new Error("Error saving todo to the database");
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const foundTodo = await todos.findOne({ _id: id, user: req.user._id });

    if (!foundTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    foundTodo.title = title;

   
    const updatedTodo = await foundTodo.save();

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:");
    res.status(500).send("Internal Server Error");
  }
};
export const completeTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const foundTodo = await todos.findOne({ _id: id, user: req.user._id });

    if (!foundTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    foundTodo.completed = true;

  
    const updatedTodo = await foundTodo.save();

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:");
    res.status(500).send("Internal Server Error");
  }
};


export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const foundTodo = await todos.findOne({ _id: id, user: req.user._id });

    if (!foundTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    await todos.findByIdAndDelete(id);

    res.status(200).send("Deleted a todo");
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).send("Internal Server Error");
  }
};