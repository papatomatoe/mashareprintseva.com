import type { ZodValidationSchema } from 'sveltekit-superforms/adapters';
import { z } from 'zod/v4';

const password = z
	.string()
	.min(1, { error: 'Password is required' })
	.min(8, { error: 'Password must be longer than 8 symbols' })
	.max(255, { error: 'Password should not exceed 255 symbols' });

const credentials = {
	email: z.email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
	password
};

export const loginSchema = z.object(credentials) as ZodValidationSchema;

export const registerSchema = z
	.object({
		...credentials,
		confirmPassword: password
	})
	.refine(({ password, confirmPassword }) => password === confirmPassword, {
		message: "The passwords don't match",
		path: ['confirmPassword']
	}) as ZodValidationSchema;

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
