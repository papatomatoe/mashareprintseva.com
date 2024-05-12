import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getSections } from '$lib/services/sections';

export const load = (async ({ locals }) => {
	if (!locals.user) redirect(302, '/admin/login');

	const data = await getSections();

	return {
		pageTitle: 'Admin | Sections',
		sections: data?.sections,
		pagination: data?.pagination
	};
}) satisfies PageServerLoad;
