import type { PageServerLoad } from '../$types';

export const load = (async () => {
	return { bio: null, pageTitle: 'Bio' };
}) satisfies PageServerLoad;
