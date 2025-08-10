import { z } from 'zod';

export const bioPageSchema = z.object({
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
	image: z.string().min(1, { message: 'Image is required' }),
	epigraph: z.string(),
	content: z.string().min(1, { message: 'Content is required' })
});

export type BioPageSchemaType = z.infer<typeof bioPageSchema>;
