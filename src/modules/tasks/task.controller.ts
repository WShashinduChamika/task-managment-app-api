import { NextFunction, Response } from "express";
import { validateSchema } from "../../common/utils/validation.utils";
import {
  CreateTaskSchema,
  type CreateTaskDto,
  ListTasksQuerySchema,
  type ListTasksQueryDto,
  UpdateTaskSchema,
  type UpdateTaskDto,
} from "./dto";
import * as tasksService from "./task.service";
import {
  AuthRequest,
  getUserIdAndRole,
} from "../../core/middleware/auth-middleware";
import { validationError } from "../../core/exceptions";

const OBJECT_ID_REGEX = /^[a-f\d]{24}$/i;

export const createTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const dto = validateSchema(CreateTaskSchema, req.body) as CreateTaskDto;

    const { id, role } = getUserIdAndRole(req.user);

    const result = await tasksService.createTask(dto, id, role);

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getTasksList = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const query = validateSchema(
      ListTasksQuerySchema,
      req.query,
    ) as ListTasksQueryDto;

    const { id, role } = getUserIdAndRole(req.user);

    const result = await tasksService.listTasks(query, id, role);

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!OBJECT_ID_REGEX.test(id as string)) {
      throw validationError("Invalid task id");
    }

    const dto = validateSchema(UpdateTaskSchema, req.body) as UpdateTaskDto;

    const { id: requesterId, role } = getUserIdAndRole(req.user);

    const result = await tasksService.updateTask(
      id as string,
      dto,
      requesterId,
      role,
    );

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!OBJECT_ID_REGEX.test(id as string)) {
      throw validationError("Invalid task id");
    }

    const { id: requesterId, role } = getUserIdAndRole(req.user);

    await tasksService.deleteTask(id as string, requesterId, role);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

