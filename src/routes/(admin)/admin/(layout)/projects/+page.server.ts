import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProjects } from '$lib/services/projects';

export const load = (async ({ locals }) => {
	if (!locals.user) redirect(302, '/admin/login');

	const projects = await getProjects();

	return {
		pageTitle: 'Admin | Projects',
		projects
	};
}) satisfies PageServerLoad;
