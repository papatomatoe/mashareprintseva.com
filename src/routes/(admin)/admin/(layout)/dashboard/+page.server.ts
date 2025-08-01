import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		pageTitle: 'Admin | Dashboard'
	};
}) satisfies PageServerLoad;
