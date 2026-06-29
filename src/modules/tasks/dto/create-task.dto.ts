import { z } from "zod/v3";

export const TASK_PRIORITIES = ["Low", "Medium", "High"] as const;
export const TASK_STATUSES = [
  "Open",
  "In Progress",
  "Testing",
  "Done",
] as const;

export const OBJECT_ID_REGEX = /^[a-f\d]{24}$/i;

export const CreateTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title must be at most 200 characters long"),

  description: z
    .string()
    .max(2000, "Description must be at most 2000 characters long")
    .optional(),

  priority: z.enum(TASK_PRIORITIES, {
    invalid_type_error: `Priority must be one of: ${TASK_PRIORITIES.join(", ")}`,
    required_error: "Priority is required",
  }),

  status: z
    .enum(TASK_STATUSES, {
      invalid_type_error: `Status must be one of: ${TASK_STATUSES.join(", ")}`,
      required_error: "Status is required",
    })
    .default("Open"),

  dueDate: z
    .string()
    .datetime({ message: "Due date must be a valid ISO 8601 date string" })
    .refine(
      (val) => new Date(val) > new Date(),
      "Due date must be a future date",
    ),

  assignedTo: z
    .string()
    .regex(OBJECT_ID_REGEX, "assignedTo must be a valid ObjectId")
    .optional(),
});

export type CreateTaskDto = z.infer<typeof CreateTaskSchema>;
