import { z } from 'zod/v3';
import { UserRole } from '../../../core/models/user.model';

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,128}$/;

export const UserRegisterSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(2, 'First name must be at least 2 characters long')
        .max(50, 'First name must be at most 50 characters long'),
    lastName: z
        .string()
        .trim()
        .min(2, 'Last name must be at least 2 characters long')
        .max(50, 'Last name must be at most 50 characters long'),
    email: z
        .string()
        .trim()
        .regex(EMAIL_REGEX, 'Email must be a valid address')
        .toLowerCase(),
    phone: z
        .string()
        .trim()
        .min(7, 'Phone number must be at least 7 characters long')
        .max(20, 'Phone number must be at most 20 characters long')
        .optional(),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .max(128, 'Password must be at most 128 characters long')
        .regex(
            PASSWORD_REGEX,
            'Password must include uppercase, lowercase, number, and special character',
        ),
    role: z.nativeEnum(UserRole).optional(),
});

export type UserRegisterDto = z.infer<typeof UserRegisterSchema>;

