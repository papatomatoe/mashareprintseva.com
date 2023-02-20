import { BASE_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	const { section, project } = params;

	const projectsData = await locals.pb
		.collection('projects')
		.getFullList(200, { filter: `published=true && section.slug="${section}"` });

	const currentProjectData = projectsData.find((e) => e.slug === project);

	if (!currentProjectData) {
		throw error(404, 'not found');
	}

	const currentProject = {
		section: section,
		id: currentProjectData.id,
		title: currentProjectData.title,
		subtitle: currentProjectData.subtitle,
		slug: currentProjectData.slug,
		content: currentProjectData.content,
		image: `${BASE_URL}/api/files/${currentProjectData.collectionId}/${currentProjectData.id}/${currentProjectData.mainImage}`,
		restProjects: projectsData
			.filter((el) => el.slug !== project)
			.map((e) => ({
				id: e.id,
				title: e.title,
				slug: e.slug,
				image: `${BASE_URL}/api/files/${e.collectionId}/${e.id}/${e.projectImage}`
			}))
	};

	return {
		project: currentProject,
		pageTitle: currentProject.title
	};
}) satisfies PageServerLoad;
