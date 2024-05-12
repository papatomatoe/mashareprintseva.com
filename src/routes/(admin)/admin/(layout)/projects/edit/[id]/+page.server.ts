import { updateProject, getProject } from '$lib/services/projects';
import { getAllSections } from '$lib/services/sections';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	if (!locals.user) redirect(302, '/admin/login');

	const { id } = params;

	const project = await getProject(id);

	if (!project) return error(404, 'not found');

	const sections = await getAllSections();

	const breadcrumbs = [
		{ title: 'dashboard', path: '/admin/dashboard' },
		{ title: 'projects', path: '/admin/projects' },
		{ title: project.title, path: `/admin/projects/edit/${project.id}` }
	];

	return {
		pageTitle: 'Admin | Projects Item Edit',
		project,
		sections,
		breadcrumbs
	};
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const id = String(data.get('id'));

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

		const response = await updateProject(id, {
			published,
			title,
			slug,
			subtitle,
			image,
			thumbnail,
			preview,
			previewThumbnail,
			content,
			section
		});

		if (!response.success) {
			return fail(400, response);
		}

		return response;
	}
} satisfies Actions;
