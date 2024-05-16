import { getMainPageData } from '$lib/services/main';

import type { PageServerLoad } from './$types';

export const load = (async () => {
	const data = await getMainPageData();

	if (!data?.published) {
		return { main: null, pageTitle: 'Main' };
	}

	return { main: data, pageTitle: 'Main' };
}) satisfies PageServerLoad;
