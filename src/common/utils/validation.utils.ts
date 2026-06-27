import z from "zod/v3";
import { validationError } from "../../core/exceptions";
import { ValidationMessage } from "./validation.messages";

export const validateSchema = <T>(schema: z.Schema<T>, data: unknown): T => {
   const result = schema.safeParse(data);

   if (!result.success) {
     const issue = result.error.issues[0];
     const message = issue?.message;

     throw validationError(message || ValidationMessage.INVALID_REQUEST_BODY);
   }

   return result.data;
};