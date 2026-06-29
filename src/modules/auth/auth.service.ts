import bcrypt from "bcryptjs";
import { conflictError, unauthorizedError } from "../../core/exceptions";
import * as repository from "./auth.repository";
import { UserLoginDto, UserRegisterDto, RefreshTokenDto } from "./dtos";
import { AuthResponse, TokenPayload } from "./interfaces/auth.interface";
import { IUser, UserRole } from "../../core/models";
import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_ACCESS_EXPIRY = parseInt(process.env.JWT_ACCESS_EXPIRY || "900");
const JWT_REFRESH_EXPIRY = parseInt(
  process.env.JWT_REFRESH_EXPIRY || String(7 * 24 * 60 * 60),
);
const SALT_ROUNDS = 10;

const generateAccessToken = (user: IUser): string => {
  const payload: TokenPayload = {
    sub: user._id.toString(),
    email: user.email,
    phone: user.phone ?? "",
    role: user.role,
    status: user.status,
    jti: crypto.randomUUID(),
  };
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_ACCESS_EXPIRY,
  } as jwt.SignOptions);
};

const generateRawRefreshToken = (): string =>
  crypto.randomBytes(64).toString("hex");

const buildAuthResponse = async (user: IUser): Promise<AuthResponse> => {
  const accessToken = generateAccessToken(user);
  const rawRefreshToken = generateRawRefreshToken();
  const expiresAt = new Date(Date.now() + JWT_REFRESH_EXPIRY * 1000);

  await repository.createRefreshToken(
    user._id.toString(),
    rawRefreshToken,
    expiresAt,
  );

  return {
    user: {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone ?? "",
      role: user.role,
      status: user.status,
    },
    accessToken,
    expiresIn: JWT_ACCESS_EXPIRY,
    refreshToken: rawRefreshToken,
    refreshExpiresIn: JWT_REFRESH_EXPIRY,
  };
};

export const register = async (dto: UserRegisterDto): Promise<AuthResponse> => {
  const exsitUser = await repository.findUserByEmail(dto.email);

  if (exsitUser) {
    throw conflictError("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(dto.password, SALT_ROUNDS);

  const user = await repository.createUser({
    firstName: dto.firstName,
    lastName: dto.lastName,
    email: dto.email.toLowerCase(),
    password: hashedPassword,
    phone: dto.phone ?? "",
    role: dto.role ?? UserRole.User,
  });

  return buildAuthResponse(user);
};

export const login = async (dto: UserLoginDto): Promise<AuthResponse> => {
  const user = await repository.findUserByEmail(dto.email);

  if (!user) {
    throw unauthorizedError("Invalid credentials");
  }

  if (user.status !== "active") {
    throw unauthorizedError("Account is not active");
  }

  const isValid = await bcrypt.compare(dto.password, user.password);
  if (!isValid) {
    throw unauthorizedError("Invalid credentials");
  }

  await repository.updateLastLogin(user._id.toString());

  return buildAuthResponse(user);
};

export const refreshToken = async (
  dto: RefreshTokenDto,
): Promise<AuthResponse> => {
  const existing = await repository.findRefreshToken(dto.refreshToken);

  if (!existing) {
    throw unauthorizedError("Invalid or expired refresh token");
  }

  if (existing.expiresAt < new Date()) {
    throw unauthorizedError("Refresh token has expired");
  }

  const user = await repository.findUserById(existing.userId.toString());

  if (!user) {
    throw unauthorizedError("User not found");
  }

  if (user.status !== "active") {
    throw unauthorizedError("Account is not active");
  }

  await repository.revokeRefreshToken(dto.refreshToken);

  return buildAuthResponse(user);
};

export const logout = async (dto: RefreshTokenDto): Promise<void> => {
  await repository.revokeRefreshToken(dto.refreshToken);
};
