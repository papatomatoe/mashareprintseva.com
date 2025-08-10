import { z } from 'zod';

export const mainPageSchema = z.object({
	id: z.string(),
	published: z.boolean(),
	title: z
		.string()
		.min(1, { message: 'Title is required' })
		.max(255, { message: 'Title should not exceed 255 symbols' }),
	slug: z
		.string()
		.min(1, { message: 'Slug is required' })
		.max(255, { message: 'Slug should not exceed 255 symbols' }),
	content: z.string()
});

export type MainPageSchemaType = z.infer<typeof mainPageSchema>;
