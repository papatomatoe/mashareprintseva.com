import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProjectBySlug } from '$lib/services/projects';

export const load: PageServerLoad = async ({ params }) => {
	const { project } = params;

	const projectData = await getProjectBySlug(project);

	if (!projectData) error(404, 'not found');

	return {
		project: projectData,
		pageTitle: projectData.title
	};
};
