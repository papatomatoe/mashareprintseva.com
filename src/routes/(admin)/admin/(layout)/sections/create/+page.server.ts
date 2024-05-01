import { createSection, db } from '$lib/database/db';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import xss from 'xss';

export const load = (async ({ locals }) => {
	if (!locals.user) throw redirect(302, '/admin/login');

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
		const title = data.get('title');
		const subtitle = data.get('subtitle');
		const slug = data.get('slug');
		const altTitle = data.get('altTitle');
		const projects = JSON.parse(String(data.get('projects')));

		if (
			typeof order !== 'number' ||
			typeof content !== 'string' ||
			typeof image !== 'string' ||
			typeof title !== 'string' ||
			typeof subtitle !== 'string' ||
			typeof slug !== 'string' ||
			typeof altTitle !== 'string'
		) {
			return fail(400, { invalid: true });
		}

		const sanitizedContent = xss(content);

		const response = await createSection({
			published,
			order,
			title,
			slug,
			subtitle,
			image,
			altTitle,
			content: sanitizedContent,
			...(projects.length && { projects })
		});

		if (!response.success) {
			return fail(400, response);
		}

		throw redirect(303, '/admin/sections');
	}
} satisfies Actions;
