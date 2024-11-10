import type { PageLoad } from './$types';

export const load = (async () => {
	return { main: null, pageTitle: 'Main' };
}) satisfies PageLoad;
