import { UserRole, UserStatus } from "../../../core/models";

export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  lastLoginAt?: Date | undefined;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserFilter {
  search?: string | undefined;
  role?: UserRole | undefined;
  status?: UserStatus | undefined;
}
