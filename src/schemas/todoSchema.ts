import mongoose from "mongoose";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateTodoInput:
 *      type: object
 *      required:
 *        - title
 *      properties:
 *        title:
 *          type: string
 *        completed:
 *          type: string
 *          default: false
 *        time:
 *          type: Date
 *          default: Date.now
 *    CreateTodoResponse:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        completed:
 *          type: string
 *        _id:
 *          type: string
 *        date:
 *          type: string
 */

const todoSchema = new mongoose.Schema({
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
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const todoModel = mongoose.model("Todos", todoSchema);

export default todoModel;
