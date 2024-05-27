import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getSectionBySlug } from '$lib/services/sections';

export const load = (async ({ params }) => {
	const { section } = params;

	const data = await getSectionBySlug(section);

	if (!data) throw error(404, 'page not found');

	return {
		section: data,
		pageTitle: data.title
	};

	// try {
	// 	const sectionData = await locals.pb
	// 		.collection('sections')
	// 		.getFirstListItem(`slug="${section}" && published=true`);

	// 	const projectsData = await locals.pb
	// 		.collection('projects')
	// 		.getFullList(200, { filter: `published=true && section="${sectionData.id}"` });

	// 	const data = {
	// 		id: sectionData.id,
	// 		title: sectionData.title,
	// 		subtitle: sectionData.subtitle,
	// 		alternativeTitle: sectionData.alternativeTitle,
	// 		description: sectionData.description,
	// 		image: `${BASE_URL}/api/files/${sectionData.collectionId}/${sectionData.id}/${sectionData.sectionImage}`,
	// 		slug: sectionData.slug,
	// 		projects: projectsData.map((project) => ({
	// 			id: project.id,
	// 			title: project.title,
	// 			slug: project.slug,
	// 			image: `${BASE_URL}/api/files/${project.collectionId}/${project.id}/${project.projectImage}`
	// 		}))
	// 	};

	// 	return {
	// 		section: data,
	// 		pageTitle: data.title
	// 	};
	// } catch (e: any) {
	// 	throw error(e.status, e.data.message);
	// }
}) satisfies PageServerLoad;
