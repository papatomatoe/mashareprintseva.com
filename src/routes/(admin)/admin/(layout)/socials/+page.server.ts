import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getSocials, createSocial, deleteSocial, updateSocial } from '$lib/services/socials';

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

		const response = await createSocial({ title, link, icon });
		if (!response.success) {
			return fail(400, response);
		}

		return response;
	},
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');

		if (typeof id !== 'string') {
			return fail(400, { invalid: true });
		}

		const response = await deleteSocial(id);
		if (!response.success) {
			return fail(400, response);
		}

		return response;
	},
	edit: async ({ request }) => {
		const data = await request.formData();

		const id = data.get('id');
		const title = data.get('title');
		const link = data.get('link');
		const icon = data.get('icon');

		if (
			typeof id !== 'string' ||
			typeof title !== 'string' ||
			typeof link !== 'string' ||
			typeof icon !== 'string'
		) {
			return fail(400, { invalid: true });
		}

		const response = await updateSocial(id, { title, link, icon });
		if (!response.success) {
			return fail(400, response);
		}

		return response;
	}
} satisfies Actions;
