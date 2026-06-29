import { NextFunction, Request, Response } from "express";
import { validateSchema } from "../../common/utils/validation.utils";
import { UserLoginSchema, UserRegisterSchema, RefreshTokenSchema } from "./dtos";
import * as authService from "./auth.service";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const dto = validateSchema(UserRegisterSchema, req.body);

    const result = await authService.register(dto);

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const dto = validateSchema(UserLoginSchema, req.body);

    const result = await authService.login(dto);

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const dto = validateSchema(RefreshTokenSchema, req.body);

    const result = await authService.refreshToken(dto);

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const dto = validateSchema(RefreshTokenSchema, req.body);

    await authService.logout(dto);

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};
