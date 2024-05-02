import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.user) redirect(302, '/admin/login');
	return {
		pageTitle: 'Admin | Projects'
	};
}) satisfies PageServerLoad;
