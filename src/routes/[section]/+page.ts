import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	console.log(params);
	try {
		const section = await import(`../../content/sections/${params.section}.md`);

		const projects = await Promise.all(
			section.metadata.projects.map(
				async (project: string) => await import(`../../content/projects/${project}.md`)
			)
		);

		const sectionProjects = projects.map((project) => ({ ...project.metadata }));
		return {
			section: { ...section.metadata, content: section.default, projects: sectionProjects },
			pageTitle: section.metadata.title
		};
	} catch (e) {
		console.log(e);
		error(404, `Could not find ${params.section}`);
	}
}) satisfies PageLoad;
