import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getSocials, createSocial } from '$lib/services/socials';
import { db } from '$lib/database/db';

export const load = (async ({ locals }) => {
	if (!locals.user) redirect(302, '/admin/login');

	const socials = await getSocials();

	return {
		pageTitle: 'Admin | Socials Menu',
		socials
	};
}) satisfies PageServerLoad;

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();

		const title = data.get('title');
		const link = data.get('link');
		const icon = data.get('icon');

		if (typeof title !== 'string' || typeof link !== 'string' || typeof icon !== 'string') {
			return fail(400, { invalid: true });
		}

		try {
			await createSocial({ title, link, icon });
			return { success: true };
		} catch (e) {
			return fail(400, { success: false });
		}
	}
} satisfies Actions;
