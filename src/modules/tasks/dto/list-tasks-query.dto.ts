import { z } from "zod/v3";
import { TASK_PRIORITIES, TASK_STATUSES, OBJECT_ID_REGEX } from "./create-task.dto";

export const ListTasksQuerySchema = z.object({
  page: z.coerce
    .number()
    .int()
    .positive("page must be a positive integer")
    .default(1),

  limit: z.coerce
    .number()
    .int()
    .positive("limit must be a positive integer")
    .max(100, "limit must be at most 100")
    .default(20),

  sortBy: z
    .enum(["createdAt", "dueDate", "priority", "status"], {
      invalid_type_error:
        "sortBy must be one of: createdAt, dueDate, priority, status",
    })
    .default("createdAt"),

  sortOrder: z
    .enum(["asc", "desc"], {
      invalid_type_error: "sortOrder must be one of: asc, desc",
    })
    .default("desc"),

  status: z
    .enum(TASK_STATUSES, {
      invalid_type_error: `status must be one of: ${TASK_STATUSES.join(", ")}`,
    })
    .optional(),

  priority: z
    .enum(TASK_PRIORITIES, {
      invalid_type_error: `priority must be one of: ${TASK_PRIORITIES.join(", ")}`,
    })
    .optional(),

  assignedTo: z
    .string()
    .regex(OBJECT_ID_REGEX, "assignedTo must be a valid ObjectId")
    .optional(),

  createdBy: z
    .string()
    .regex(OBJECT_ID_REGEX, "createdBy must be a valid ObjectId")
    .optional(),

  search: z
    .string()
    .max(100, "search must be at most 100 characters")
    .optional(),
});

export type ListTasksQueryDto = z.infer<typeof ListTasksQuerySchema>;
