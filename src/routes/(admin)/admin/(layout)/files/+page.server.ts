import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getFileList } from '$lib/database/db';
export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) throw redirect(302, '/admin/login');

	try {
		const files = await getFileList();

		return {
			pageTitle: 'Admin | Files',
			filesData: files
		};
	} catch (e) {
		console.log(e);
		throw error(400, 'Something went wrong');
	}
};
