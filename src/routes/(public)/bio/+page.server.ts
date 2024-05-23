import type { PageServerLoad } from '../$types';
import { getBioPageData } from '$lib/services/bio';

export const load = (async () => {
	const data = await getBioPageData();
	if (!data?.published) {
		return { bio: null, pageTitle: 'Bio' };
	}

	return { bio: data, pageTitle: 'Bio' };
}) satisfies PageServerLoad;
