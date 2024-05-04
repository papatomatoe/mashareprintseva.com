import { getSection, updateSection } from '$lib/database/db';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	if (!locals.user) redirect(302, '/admin/login');

	const { id } = params;

	const section = await getSection(id);

	if (!section) return error(404, 'not found');

	const breadcrumbs = [
		{ title: 'dashboard', path: '/admin/dashboard' },
		{ title: 'sections', path: '/admin/sections' },
		{ title: section.title, path: `/admin/sections/edit/${section.id}` }
	];

	return {
		pageTitle: `Admin | ${section.title ?? 'Section'} Edit`,
		section,
		breadcrumbs
	};
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const id = String(data.get('id'));

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

		const response = await updateSection(id, {
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

		return response;
	}
} satisfies Actions;
