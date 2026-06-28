import mongoose, { Schema, Document, Types } from "mongoose";

export type TaskPriority = "Low" | "Medium" | "High";
export type TaskStatus = "Open" | "In Progress" | "Testing" | "Done";

export const VALID_PRIORITIES: TaskPriority[] = ["Low", "Medium", "High"];
export const VALID_STATUSES: TaskStatus[] = [
  "Open",
  "In Progress",
  "Testing",
  "Done",
];

export interface ITaskFields {
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: Date;
  createdBy: Types.ObjectId;
  assignedTo: Types.ObjectId | null;
}

export interface ITask extends ITaskFields, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true, maxlength: 200 },
    description: { type: String },
    priority: {
      type: String,
      enum: VALID_PRIORITIES,
      required: true,
    },
    status: {
      type: String,
      enum: VALID_STATUSES,
      default: "Open",
    },
    dueDate: { type: Date, required: true },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

TaskSchema.index({ createdBy: 1 });
TaskSchema.index({ assignedTo: 1 });
TaskSchema.index({ status: 1 });
TaskSchema.index({ priority: 1 });
TaskSchema.index({ dueDate: 1 });
TaskSchema.index({ title: "text", description: "text" });

export const Task = mongoose.model<ITask>("Task", TaskSchema);
