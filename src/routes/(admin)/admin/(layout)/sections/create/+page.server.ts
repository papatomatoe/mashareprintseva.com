import { createSection } from '$lib/services/sections';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getProjects } from '$lib/services/projects';

export const load = (async ({ locals }) => {
	if (!locals.user) redirect(302, '/admin/login');

	const projects = await getProjects();

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
		const thumbnail = data.get('thumbnail');
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

		const response = await createSection({
			published,
			order,
			title,
			slug,
			subtitle,
			image,
			thumbnail,
			altTitle,
			content,
			...(projects.length && { projects })
		});

		if (!response.success) {
			return fail(400, response);
		}

		redirect(303, '/admin/sections');
	}
} satisfies Actions;
