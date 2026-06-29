import {
  IUser,
  IUserFields,
  User,
  RefreshToken,
  IRefreshToken,
} from "../../core/models";
import { Types } from "mongoose";

export const createUser = async (
  data: Partial<IUserFields>,
): Promise<IUser> => {
  return await User.create(data);
};

export const findUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email });
};

export const updateLastLogin = async (id: string): Promise<void> => {
  await User.findByIdAndUpdate(id, { lastLoginAt: new Date() });
};

export const createRefreshToken = async (
  userId: string,
  token: string,
  expiresAt: Date,
): Promise<IRefreshToken> => {
  return await RefreshToken.create({
    userId: new Types.ObjectId(userId),
    token,
    expiresAt,
  });
};

export const findRefreshToken = async (
  token: string,
): Promise<IRefreshToken | null> => {
  return await RefreshToken.findOne({ token, revoked: false }).exec();
};

export const revokeRefreshToken = async (token: string): Promise<void> => {
  await RefreshToken.findOneAndUpdate(
    { token },
    { $set: { revoked: true } },
  ).exec();
};

export const revokeAllUserRefreshTokens = async (
  userId: string,
): Promise<void> => {
  await RefreshToken.updateMany(
    { userId: new Types.ObjectId(userId), revoked: false },
    { $set: { revoked: true } },
  ).exec();
};
