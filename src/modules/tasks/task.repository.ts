import { PaginationOptions } from "../../core/interfaces/paginations.interface";
import { ITask, ITaskFields, Task } from "../../core/models";
import { TaskFilter } from "./interfaces/task.interface";

export const createTask = async (
  data: Partial<ITaskFields>,
): Promise<ITask> => {
  return await Task.create(data);
};

export const findAllPaginated = async (
  pagination: PaginationOptions,
  filter: TaskFilter,
): Promise<{ tasks: any[]; total: number }> => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = pagination;

  const { search, status, priority, assignedTo, createdBy } = filter;

  const query: Record<string, any> = { deletedAt: null };

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  if (status) {
    query.status = status;
  }

  if (priority) {
    query.priority = priority;
  }

  if (assignedTo) {
    query.assignedTo = assignedTo;
  }

  if (createdBy) {
    query.createdBy = createdBy;
  }

  const sorrDirection = sortOrder === "asc" ? 1 : -1;

  const skip = (page - 1) * limit;

  const [tasks, total] = await Promise.all([
    Task.find(query)
      .sort({ [sortBy]: sorrDirection })
      .skip(skip)
      .limit(limit)
      .populate("createdBy", "firstName lastName email")
      .populate("assignedTo", "firstName lastName email")
      .exec(),
    Task.countDocuments(query),
  ]);

  return { tasks, total };
};

export const findById = async (id: string): Promise<ITask | null> => {
  return await Task.findOne({ _id: id, deletedAt: null }).exec();
};

export const updateTask = async (
  id: string,
  data: Partial<ITaskFields>,
): Promise<ITask | null> => {
  return await Task.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: data },
    { new: true, runValidators: true },
  ).exec();
};

export const softDeleteTask = async (id: string): Promise<ITask | null> => {
  return await Task.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { deletedAt: new Date() } },
    { new: true },
  ).exec();
};
