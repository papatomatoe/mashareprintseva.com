import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { db } from '$/lib/database';
import { getMainPageData } from '$lib/services/main';

export const load = (async ({ locals }) => {
	if (!locals.user) redirect(302, '/admin/login');

	const mainPage = await getMainPageData();
	return { mainPage, pageTitle: 'Admin | Main Page' };
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
				create: { title: 'mainPage', slug: '', content, published }
			});
			return { success: true };
		} catch (e) {
			return fail(400, { success: false });
		}
	}
} satisfies Actions;
