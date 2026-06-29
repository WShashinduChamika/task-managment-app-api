import * as repository from "./user.repository";
import type { ListUsersQueryDto } from "./dto";
import { UserResponse } from "./interfaces/user.interface";
import { IUser, UserRole } from "../../core/models/user.model";
import { PaginatedResult } from "../../core/interfaces/paginations.interface";
import { forbiddenError } from "../../core/exceptions";

const buildUserResponse = (user: IUser): UserResponse => {
  return {
    id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone ?? "",
    role: user.role,
    status: user.status,
    lastLoginAt: user.lastLoginAt,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const listUsers = async (
  query: ListUsersQueryDto,
  requesterRole: UserRole,
): Promise<PaginatedResult<UserResponse>> => {
  if (requesterRole !== UserRole.Admin) {
    throw forbiddenError("Only administrators can view the user list");
  }

  const { page, limit, sortBy, sortOrder, status, role, search } = query;

  const trimmedSearch = search?.trim() ?? "";

  const filter = {
    search: trimmedSearch,
    status: status,
    role: role,
  };

  const pagination = {
    page,
    limit,
    sortBy,
    sortOrder,
  };

  const { users, total } = await repository.findAllPaginated(
    pagination,
    filter,
  );

  return {
    items: users.map(buildUserResponse),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};
