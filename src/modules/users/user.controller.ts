import { NextFunction, Response } from "express";
import { validateSchema } from "../../common/utils/validation.utils";
import {
  ListUsersQuerySchema,
  type ListUsersQueryDto,
} from "./dto";
import * as usersService from "./user.service";
import { AuthRequest, getUserIdAndRole } from "../../core/middleware/auth-middleware";

export const getUsersList = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const query = validateSchema(
      ListUsersQuerySchema,
      req.query,
    ) as ListUsersQueryDto;

    const { role } = getUserIdAndRole(req.user);

    const result = await usersService.listUsers(query, role);

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
