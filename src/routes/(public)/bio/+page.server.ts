import { BASE_URL } from '$env/static/private';
import type { PageServerLoad } from '../$types';

export const load = (async ({ locals }) => {
	try {
		const data = await locals.pb
			.collection('bio')
			.getFirstListItem('title="Bio"', { filter: 'published=true' });

		const bio = {
			id: data.id,
			title: data.title,
			epigraph: data.epigraph,
			content: data.content,
			image: `${BASE_URL}/api/files/${data.collectionId}/${data.id}/${data.image}`
		};

		return { bio, pageTitle: 'Bio' };
	} catch (e) {
		console.log(e);
		return { bio: null, pageTitle: 'Bio' };
	}
}) satisfies PageServerLoad;
