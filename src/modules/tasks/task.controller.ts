import { NextFunction, Response } from "express";
import { validateSchema } from "../../common/utils/validation.utils";
import { CreateTaskSchema, CreateTaskDto } from "./dto";
import * as tasksService from "./task.service";
import {
  AuthRequest,
  getUserIdAndRole,
} from "../../core/middleware/auth-middleware";

export const createTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const dto = validateSchema(CreateTaskSchema, req.body) as CreateTaskDto;

    const { id, role } = getUserIdAndRole(req.user);

    const result = await tasksService.createTask(dto, id, role);

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
