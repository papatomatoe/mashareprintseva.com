import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { imageKit } from '$lib/database/static';
import type { FileObject } from 'imagekit/dist/libs/interfaces';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) throw redirect(302, '/admin/login');

	try {
		const files = await imageKit.listFiles({
			skip: 0,
			limit: 50
		});

		return {
			pageTitle: 'Admin | Files',
			files: files as FileObject[]
		};
	} catch (e) {
		throw error(400, 'Something went wrong');
	}
};
