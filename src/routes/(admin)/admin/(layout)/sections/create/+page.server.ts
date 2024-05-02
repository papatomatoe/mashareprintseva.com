import { createSection, db } from '$lib/database/db';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import xss from 'xss';
import { OPTIONS } from '$lib/constants/xssConfig';

export const load = (async ({ locals }) => {
	if (!locals.user) redirect(302, '/admin/login');

	const projects = await db.project.findMany();

	return {
		projects,
		pageTitle: 'Admin | Create New Section'
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const order = Number(data.get('order'));
		const published = Boolean(data.get('published'));
		const content = data.get('content');
		const image = data.get('image');
		const thumbnail = data.get('preview');
		const title = data.get('title');
		const subtitle = data.get('subtitle');
		const slug = data.get('slug');
		const altTitle = data.get('altTitle');
		const projects = JSON.parse(String(data.get('projects')));

		if (
			typeof order !== 'number' ||
			typeof content !== 'string' ||
			typeof image !== 'string' ||
			typeof thumbnail !== 'string' ||
			typeof title !== 'string' ||
			typeof subtitle !== 'string' ||
			typeof slug !== 'string' ||
			typeof altTitle !== 'string'
		) {
			return fail(400, { invalid: true });
		}

		// const sanitizedContent = xss(content, OPTIONS); // NOTE: some unexpected behavior, leave unsanitized.
		const sanitizedContent = content;

		const response = await createSection({
			published,
			order,
			title,
			slug,
			subtitle,
			image,
			thumbnail,
			altTitle,
			content: sanitizedContent,
			...(projects.length && { projects })
		});

		if (!response.success) {
			return fail(400, response);
		}

		redirect(303, '/admin/sections');
	}
} satisfies Actions;
