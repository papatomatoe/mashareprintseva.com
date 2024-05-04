import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getUsers } from '$lib/services/users';

export const load = (async ({ locals }) => {
	if (!locals.user) redirect(302, '/admin/login');

	const users = await getUsers();
	return {
		pageTitle: 'Admin | Users',
		users
	};
}) satisfies PageServerLoad;
