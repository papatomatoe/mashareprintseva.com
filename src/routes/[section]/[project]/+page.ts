import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Project } from '$lib/types/project';

export const load = (async ({ params }) => {
	try {
		const sectionData = await import(`$content/sections/${params.section}.md`);

		if (!sectionData || !sectionData.metadata.published) error(404, 'Project not found');

		const projectData = await import(`$content/projects/${params.project}.md`);

		if (!projectData || !projectData.metadata.published) error(404, 'Project not found');

		const projects = sectionData.metadata.projects;

		const restProjects = await Promise.all(
			projects.map(async (project: Project) => await import(`$content/projects/${project}.md`))
		);

		const mappedRestProject = restProjects
			.map((project) => ({ ...project.metadata }))
			.filter((proj) => proj.slug !== params.project && proj.published);

		const project = projectData.metadata.published
			? { ...projectData.metadata, content: projectData.default, restProjects: mappedRestProject }
			: null;

		return {
			pageTitle: project.title,
			project
		};
	} catch (e) {
		console.error(e);
		error(404, 'Project not found');
	}
}) satisfies PageLoad;
