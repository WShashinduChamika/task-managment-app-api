import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { unauthorizedError } from "../exceptions";
import { UserRole } from "../models/user.model";

export interface JwtPayload {
  sub: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: string;
  jti: string;
}

export const requireAuth = (user: JwtPayload | undefined): JwtPayload => {
  if (!user) throw unauthorizedError("Not authenticated");
  return user;
};

export const getUserIdAndRole = (
  user: JwtPayload | undefined,
): { id: string; role: UserRole } => {
  const userPayload = requireAuth(user);

  if (!userPayload.sub || !userPayload.role) {
    throw unauthorizedError("User not authenticated");
  }

  return { id: userPayload.sub, role: userPayload.role };
};

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

export const authMiddleware = (
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw unauthorizedError("No token provided");
    }

    const token = authHeader.substring(7);

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      req.user = decoded;

      next();
    } catch {
      throw unauthorizedError("Invalid or expired token");
    }
  } catch (error) {
    next(error);
  }
};
