import type { ZodValidationSchema } from 'sveltekit-superforms/adapters';
import { z } from 'zod/v4';

export const mainPageSchema = z.object({
	id: z.string(),
	published: z.boolean(),
	title: z
		.string()
		.min(1, { error: 'Title is required' })
		.max(255, { error: 'Title should not exceed 255 symbols' }),
	slug: z
		.string()
		.min(1, { error: 'Slug is required' })
		.max(255, { error: 'Slug should not exceed 255 symbols' }),
	content: z.string()
}) as ZodValidationSchema;

export type MainPageSchemaType = z.infer<typeof mainPageSchema>;
