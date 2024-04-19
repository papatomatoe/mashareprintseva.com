import { BASE_URL } from '$env/static/private';

import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	try {
		const data = await locals.pb
			.collection('main')
			.getFirstListItem('title="Main"', { filter: 'published=true' });

		const main = {
			id: data.id,
			title: data.title,
			image: `${BASE_URL}/api/files/${data.collectionId}/${data.id}/${data.image}`
		};
		return { main, pageTitle: 'Main' };
	} catch (e) {
		return { main: null, pageTitle: 'Main' };
	}
}) satisfies PageServerLoad;
