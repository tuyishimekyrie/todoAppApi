import { Request, Response } from "express";
import todos from "../schemas/todoSchema";

// export const findTodos = async (req: Request, res: Response) => {
//   try {
//     const allTodos = await todos.find();
//     console.log("All Todos" + allTodos);
//     res.status(200).send(allTodos);
//   } catch (error) {
//     console.error("Error finding todos:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };
// Find Todos Controller
export const findTodos = async (req:Request, res:Response) => {
  try {
    // Find todos associated with the authenticated user
    const alltodos = await todos.find({ user: req.user._id });
    res.json(alltodos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
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

    // Save the updated genre
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

    // Save the updated genre
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

    await todos.findByIdAndDelete(id); // Correctly delete the todo by its ID

    res.status(200).send("Deleted a todo");
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).send("Internal Server Error");
  }
};