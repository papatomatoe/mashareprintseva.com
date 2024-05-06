import { createSection, getSections } from '$lib/services/sections';
import { createProject } from '$lib/services/projects';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.user) redirect(302, '/admin/login');

	const sections = await getSections();
	return {
		sections,
		pageTitle: 'Admin | Create New Project'
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const published = Boolean(data.get('published'));
		const content = data.get('content');
		const image = data.get('image');
		const thumbnail = data.get('thumbnail');
		const preview = data.get('projectPreview');
		const previewThumbnail = data.get('projectPreviewThumbnail');
		const title = data.get('title');
		const slug = data.get('slug');
		const subtitle = data.get('subtitle');
		const section = JSON.parse(String(data.get('section')));

		if (
			typeof content !== 'string' ||
			typeof image !== 'string' ||
			typeof thumbnail !== 'string' ||
			typeof preview !== 'string' ||
			typeof previewThumbnail !== 'string' ||
			typeof title !== 'string' ||
			typeof subtitle !== 'string' ||
			typeof slug !== 'string'
		) {
			return fail(400, { invalid: true });
		}

		const response = await createProject({
			published,
			title,
			slug,
			subtitle,
			image,
			thumbnail,
			preview,
			previewThumbnail,
			content,
			...(section && { sectionId: section.id })
		});

		if (!response.success) {
			return fail(400, response);
		}

		redirect(303, '/admin/projects');
	}
} satisfies Actions;
