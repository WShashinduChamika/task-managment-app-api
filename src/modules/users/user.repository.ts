import { PaginationOptions } from "../../core/interfaces/paginations.interface";
import { User } from "../../core/models";
import { UserFilter } from "./interfaces/user.interface";

export const findAllPaginated = async (
  pagination: PaginationOptions,
  filter: UserFilter,
): Promise<{ users: any[]; total: number }> => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = pagination;

  const { search, role, status } = filter;

  const query: Record<string, any> = {};

  if (search) {
    const searchRegex = { $regex: search, $options: "i" };
    query.$or = [
      { firstName: searchRegex },
      { lastName: searchRegex },
      { email: searchRegex },
    ];
  }

  if (role) {
    query.role = role;
  }

  if (status) {
    query.status = status;
  } else {
    query.deletedAt = null;
  }

  const sortDirection = sortOrder === "asc" ? 1 : -1;
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find(query)
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(limit)
      .exec(),
    User.countDocuments(query),
  ]);

  return { users, total };
};

export const findActiveUsers = async (): Promise<any[]> => {
  return await User.find({ status: "active", deletedAt: null })
    .select("firstName lastName email")
    .sort({ firstName: 1, lastName: 1 })
    .exec();
};

