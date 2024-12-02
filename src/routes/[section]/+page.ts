import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	try {
		const sectionData = await import(`$content/sections/${params.section}.md`);

		if (!sectionData.metadata.published) error(404, `Could not find ${params.section}`);

		let projects = [];

		const sectionProjects = sectionData.metadata.projects;

		if (sectionProjects?.length) {
			const projectsData = await Promise.all(
				sectionData.metadata.projects.map(
					async (project: string) => await import(`$content/projects/${project}.md`)
				)
			);
			projects = projectsData
				.map((project) => ({ ...project.metadata }))
				.filter((proj) => proj.published);
		}

		return {
			section: { ...sectionData.metadata, content: sectionData.default, projects },
			pageTitle: sectionData.metadata.title
		};
	} catch (e) {
		console.log(e);
		error(404, `Could not find ${params.section}`);
	}
}) satisfies PageLoad;
