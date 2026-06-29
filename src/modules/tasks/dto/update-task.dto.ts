import { z } from "zod/v3";
import { OBJECT_ID_REGEX, TASK_PRIORITIES, TASK_STATUSES } from "./create-task.dto";

export const UpdateTaskSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Title is required")
      .max(200, "Title must be at most 200 characters long")
      .optional(),

    description: z
      .string()
      .max(2000, "Description must be at most 2000 characters long")
      .optional(),

    priority: z
      .enum(TASK_PRIORITIES, {
        invalid_type_error: `Priority must be one of: ${TASK_PRIORITIES.join(", ")}`,
      })
      .optional(),

    status: z
      .enum(TASK_STATUSES, {
        invalid_type_error: `Status must be one of: ${TASK_STATUSES.join(", ")}`,
      })
      .optional(),

    dueDate: z
      .string()
      .datetime({ message: "Due date must be a valid ISO 8601 date string" })
      .refine(
        (val) => new Date(val) > new Date(),
        "Due date must be a future date",
      )
      .optional(),

    assignedTo: z
      .string()
      .regex(OBJECT_ID_REGEX, "assignedTo must be a valid ObjectId")
      .nullable()
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

export type UpdateTaskDto = z.infer<typeof UpdateTaskSchema>;
