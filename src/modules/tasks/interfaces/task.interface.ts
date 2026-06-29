import { TaskPriority, TaskStatus } from "../../../core/models/task.model";

export interface TaskResponse {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskResponse extends TaskResponse {
  createdBy: string;
  assignedTo: string | null;
}

export interface UpdateTaskResponse extends TaskResponse {
  createdBy: string;
  assignedTo: string | null;
}

export interface GetTaskResponse extends TaskResponse {
  createdBy: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  assignedTo: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
}

export interface TaskFilter {
  search?: string;
  status?: string;
  priority?: string;
  assignedTo?: string;
  createdBy?: string;
}
