import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/database/db';

export const load = (async ({ locals }) => {
	if (!locals.user) throw redirect(302, '/admin/login');

	const section = await db.section.findMany();

	console.log(section);

	return {
		pageTitle: 'Admin | Sections'
	};
}) satisfies PageServerLoad;
