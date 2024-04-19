import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.user) throw redirect(302, '/admin/login');
	return {
		pageTitle: 'Admin | Sections'
	};
}) satisfies PageServerLoad;
