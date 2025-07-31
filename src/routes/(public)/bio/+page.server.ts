import type { PageServerLoad } from './$types';
import { getBioPageData } from '$lib/services/bio';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const bio = await getBioPageData();

	if (!bio) error(404, 'page not found');

	return { bio, pageTitle: bio?.title };
};
