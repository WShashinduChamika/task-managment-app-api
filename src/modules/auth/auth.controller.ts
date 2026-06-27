import { NextFunction, Request, Response } from "express";
import { validateSchema } from "../../common/utils/validation.utils";
import { UserRegisterSchema } from "./dtos";
import * as authService from "./auth.service";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const dto = validateSchema(UserRegisterSchema, req.body);

    const result = await authService.register(dto);

    res.status(201).json({ success:true, data: result});

  }catch (error) {
    next(error);
  }
};