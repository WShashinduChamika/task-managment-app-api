import { Types } from "mongoose";
import * as repository from "./task.repository";
import type { CreateTaskDto, ListTasksQueryDto, UpdateTaskDto } from "./dto";
import {
  CreateTaskResponse,
  GetTaskResponse,
  TaskResponse,
  UpdateTaskResponse,
} from "./interfaces/task.interface";
import { ITask } from "../../core/models/task.model";
import { UserRole } from "../../core/models";
import { PaginatedResult } from "../../core/interfaces/paginations.interface";
import { notFound, forbiddenError } from "../../core/exceptions";

const buildCreateTaskResponse = (task: ITask): CreateTaskResponse => {
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

const buildListTasksResponse = (task: any): GetTaskResponse => {
  return {
    id: task._id.toString(),
    title: task.title,
    description: task.description ?? "",
    priority: task.priority,
    status: task.status,
    dueDate: task.dueDate,
    createdBy: {
      id: task.createdBy._id?.toString() ?? "",
      firstName: task.createdBy.firstName ?? "",
      lastName: task.createdBy.lastName ?? "",
      email: task.createdBy.email ?? "",
    },
    assignedTo: task.assignedTo
      ? {
          id: task.assignedTo._id?.toString() ?? "",
          firstName: task.assignedTo.firstName ?? "",
          lastName: task.assignedTo.lastName ?? "",
          email: task.assignedTo.email ?? "",
        }
      : null,
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

  return buildCreateTaskResponse(task);
};

export const listTasks = async (
  query: ListTasksQueryDto,
  requesterId: string,
  role: UserRole,
): Promise<PaginatedResult<TaskResponse>> => {
  const {
    page,
    limit,
    sortBy,
    sortOrder,
    status,
    priority,
    assignedTo,
    createdBy,
    search,
  } = query;

  const trimmedSearch = search?.trim() ?? "";

  const filter = {
    search: trimmedSearch,
    status: status ?? "",
    priority: priority ?? "",
    assignedTo: role === UserRole.User ? requesterId : (assignedTo ?? ""),
    createdBy: role === UserRole.User ? requesterId : (createdBy ?? ""),
  };

  const pagination = {
    page,
    limit,
    sortBy,
    sortOrder,
  };

  const { tasks, total } = await repository.findAllPaginated(
    pagination,
    filter,
  );

  //console.log(tasks);
  console.log(total);

  return {
    items: tasks.map(buildListTasksResponse),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

export const updateTask = async (
  taskId: string,
  dto: UpdateTaskDto,
  requesterId: string,
  role: UserRole,
): Promise<UpdateTaskResponse> => {
  const existing = await repository.findById(taskId);

  if (!existing) {
    throw notFound("Task not found");
  }

  if (
    role !== UserRole.Admin &&
    existing.createdBy.toString() !== requesterId
  ) {
    throw forbiddenError("You are not authorized to update this task");
  }

  const updateData: Partial<ITask> = {};

  if (dto.title !== undefined) updateData.title = dto.title;
  if (dto.description !== undefined) updateData.description = dto.description;
  if (dto.priority !== undefined) updateData.priority = dto.priority;
  if (dto.status !== undefined) updateData.status = dto.status;
  if (dto.dueDate !== undefined) updateData.dueDate = new Date(dto.dueDate);

  if (dto.assignedTo !== undefined) {
    if (role === UserRole.User) {
      throw forbiddenError("Users cannot reassign tasks");
    }
    updateData.assignedTo =
      dto.assignedTo !== null ? new Types.ObjectId(dto.assignedTo) : null;
  }

  const updated = await repository.updateTask(taskId, updateData);

  if (!updated) {
    throw notFound("Task not found");
  }

  return {
    id: updated._id.toString(),
    title: updated.title,
    description: updated.description ?? "",
    priority: updated.priority,
    status: updated.status,
    dueDate: updated.dueDate,
    createdBy: updated.createdBy.toString(),
    assignedTo: updated.assignedTo?.toString() ?? null,
    createdAt: updated.createdAt,
    updatedAt: updated.updatedAt,
  };
};
