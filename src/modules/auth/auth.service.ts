import bcrypt from "bcryptjs";
import { conflictError } from "../../core/exceptions";
import * as repository from "./auth.repository";
import { UserRegisterDto } from "./dtos";
import { AuthResponse, TokenPayload } from "./interfaces/auth.interface";
import { IUser, UserRole } from "../../core/models";
import * as jwt from "jsonwebtoken";
import * as crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_ACCESS_EXPIRY = parseInt(process.env.JWT_ACCESS_EXPIRY || '900');
const SALT_ROUNDS = 10;

const generateAccessToken = (user: IUser): string => {
  const payload: TokenPayload = {
    sub: user._id.toString(),
    email: user.email,
    phone: user.phone ?? '',
    role: user.role,
    status: user.status,
    jti: crypto.randomUUID(),
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_ACCESS_EXPIRY } as jwt.SignOptions);
};


const buildAuthResponse = async (user: IUser): Promise<AuthResponse> => {
  const accessToken = generateAccessToken(user);
  return {
    user: {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone ?? '',
      role: user.role,
      status: user.status,
    },
    accessToken,
    expiresIn: JWT_ACCESS_EXPIRY,
  };
};

export const register = async(dto: UserRegisterDto): Promise<AuthResponse> => {
   const excitUser = await repository.findUserByEmail(dto.email);

   if (excitUser) {
     throw conflictError('Email already registered');
   }

   const hashedPassword = await bcrypt.hash(dto.password, SALT_ROUNDS);

   const user = await repository.createUser({
     firstName: dto.firstName,
     lastName: dto.lastName,
     email: dto.email.toLowerCase(),
     password: hashedPassword,
     phone: dto.phone ?? '',
     role: dto.role ?? UserRole.User
   });

   return buildAuthResponse(user);
}