import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProjectBySlug } from '$lib/services/projects';

export const load = (async ({ params }) => {
	const { section, project } = params;

	const projectData = await getProjectBySlug(project);
	if (!projectData) {
		throw error(404, 'not found');
	}

	return {
		project: { ...projectData, section },
		pageTitle: projectData.title
	};
}) satisfies PageServerLoad;
