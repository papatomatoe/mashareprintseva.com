import { error } from '@sveltejs/kit';
import type { PageLoad } from '../$types';

export const load = (async () => {
	try {
		const bio = await import('../../content/bio.md');
		return { bio: { ...bio.metadata, content: bio.default }, pageTitle: 'Bio' };
	} catch (e) {
		console.error(e);
		error(404, `page not found`);
	}
}) satisfies PageLoad;
