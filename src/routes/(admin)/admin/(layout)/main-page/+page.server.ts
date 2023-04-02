import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/database';

export const load = (async ({ locals }) => {
	if (!locals.user) throw redirect(302, '/admin/login');

	const mainPage = await db.mainPage.findFirst();

	return {
		mainPage,
		pageTitle: 'Admin | Main Page'
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const published = Boolean(data.get('published'));
		const content = data.get('content');

		if (typeof content !== 'string') {
			return fail(400, { invalid: true });
		}

		try {
			await db.mainPage.upsert({
				where: { title: 'mainPage' },
				update: { published, content },
				create: { title: 'mainPage', slug: '', published, content }
			});
			return { success: true };
		} catch (e) {
			return fail(400, { success: false });
		}
	}
} satisfies Actions;
