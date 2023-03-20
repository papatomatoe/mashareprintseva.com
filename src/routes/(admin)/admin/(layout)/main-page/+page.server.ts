import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.user) throw redirect(302, '/admin/login');
	return {
		pageTitle: 'Admin Main Page'
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const title = data.get('title');
		const slug = data.get('slug');
		const published = data.get('published');
		const content = data.get('content');

		console.log(title, slug, published, content);
	}
} satisfies Actions;
