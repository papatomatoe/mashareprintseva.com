import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Project } from '$lib/types/project';

export const load = (async ({ params }) => {
	try {
		const section = await import(`../../../content/sections/${params.section}.md`);

		const project = await import(`../../../content/projects/${params.project}.md`);

		const projects = section.metadata.projects;

		const restProjects = await Promise.all(
			projects.map(
				async (project: Project) => await import(`../../../content/projects/${project}.md`)
			)
		);

		console.log(restProjects);

		const mappedRestProject = restProjects.map((project) => ({ ...project.metadata }));

		return {
			pageTitle: project.metadata.title,
			project: { ...project.metadata, content: project.default, restProjects: mappedRestProject }
		};
	} catch (e) {
		console.error(e);
		error(404, 'Project not found');
	}
}) satisfies PageLoad;