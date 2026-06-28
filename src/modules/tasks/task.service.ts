import { Types } from "mongoose";
import * as repository from "./task.repository";
import { CreateTaskDto } from "./dto";
import { TaskResponse } from "./interfaces/task.interface";
import { ITask } from "../../core/models/task.model";
import { UserRole } from "../../core/models";

const buildTaskResponse = (task: ITask): TaskResponse => {
  return {
    id: task._id.toString(),
    title: task.title,
    description: task.description ?? "",
    priority: task.priority,
    status: task.status,
    dueDate: task.dueDate,
    createdBy: task.createdBy.toString(),
    assignedTo: task.assignedTo?.toString() ?? null,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  };
};

export const createTask = async (
  dto: CreateTaskDto,
  requesterId: string,
  role: UserRole,
): Promise<TaskResponse> => {
  const assignedTo =
    role === UserRole.User
      ? new Types.ObjectId(requesterId)
      : dto.assignedTo
        ? new Types.ObjectId(dto.assignedTo)
        : null;

  const task = await repository.createTask({
    title: dto.title,
    description: dto.description ?? "",
    priority: dto.priority,
    status: dto.status,
    dueDate: new Date(dto.dueDate),
    createdBy: new Types.ObjectId(requesterId),
    assignedTo,
  });

  return buildTaskResponse(task);
};
