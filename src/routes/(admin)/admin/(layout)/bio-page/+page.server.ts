import { db } from '$lib/database/db';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.user) throw redirect(302, '/admin/login');

	const bio = await db.bio.findFirst();

	return {
		bio,
		pageTitle: 'Admin | Bio Page'
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const published = Boolean(data.get('published'));
		const content = data.get('content');
		const image = data.get('image');
		const preview = data.get('preview');
		const epigraph = data.get('epigraph');

		if (
			typeof content !== 'string' ||
			typeof image !== 'string' ||
			typeof epigraph !== 'string' ||
			typeof preview !== 'string'
		) {
			return fail(400, { invalid: true });
		}

		try {
			await db.bio.upsert({
				where: { title: 'bio' },
				update: { published, content, image, epigraph, preview },
				create: { title: 'bio', slug: 'bio', published, content, image, epigraph, preview }
			});
			return { success: true };
		} catch (e) {
			return fail(400, { success: false });
		}
	}
} satisfies Actions;
