import { z } from 'zod/v3';
import { EMAIL_REGEX } from './register.dto';

export const UserLoginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, 'Email is required')
        .regex(EMAIL_REGEX, 'Email must be a valid address')
        .toLowerCase(),
    password: z
        .string()
        .trim()
        .min(1, 'Password is requird')
});

export type UserLoginDto = z.infer<typeof UserLoginSchema>;