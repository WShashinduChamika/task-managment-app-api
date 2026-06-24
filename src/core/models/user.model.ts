import mongoose, { Schema, Document, Types } from 'mongoose';

export enum UserRole {
  Admin = 'Admin',
  User = 'User'
}

export type UserStatus = 'active' | 'deleted';

export const VALID_ROLES: UserRole[] = Object.values(UserRole);

export interface IUserFields {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  password?: string;
  role: UserRole;
  status: UserStatus;
  lastLoginAt?: Date;
  deletedAt?: Date;
}

export interface IUser extends IUserFields, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, lowercase: true },
    phone: { type: String },
    password: { type: String },
    role: {
      type: String,
      enum: VALID_ROLES,
      default: UserRole.User,
    },
    status: {
      type: String,
      enum: ['active', 'deleted'],
      default: 'active',
    },
    lastLoginAt: { type: Date },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 }, { unique: true, sparse: true });
UserSchema.index({ status: 1 });

export const User = mongoose.model<IUser>('User', UserSchema);
