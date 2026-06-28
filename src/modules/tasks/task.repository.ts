import { ITask, ITaskFields, Task } from "../../core/models";

export const createTask = async (data: Partial<ITaskFields>): Promise<ITask> => {
  return await Task.create(data);
};
