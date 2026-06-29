import { z } from "zod/v3";
import { UserRole } from "../../../core/models";

export const ListUsersQuerySchema = z.object({
  page: z.coerce
    .number()
    .int()
    .positive("Page must be greater than 0")
    .default(1),
  limit: z.coerce
    .number()
    .int()
    .positive("Limit must be greater than 0")
    .max(100, "Limit must be at most 100")
    .default(10),
  sortBy: z.string().optional().default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
  search: z.string().optional(),
  role: z.nativeEnum(UserRole).optional(),
  status: z.enum(["active", "deleted"] as const).optional(),
});

export type ListUsersQueryDto = z.infer<typeof ListUsersQuerySchema>;
