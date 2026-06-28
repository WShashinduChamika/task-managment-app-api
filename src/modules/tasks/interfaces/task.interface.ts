import { TaskPriority, TaskStatus } from "../../../core/models/task.model";

export interface TaskResponse {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: Date;
  createdBy: string;
  assignedTo: string | null;
  createdAt: Date;
  updatedAt: Date;
}
