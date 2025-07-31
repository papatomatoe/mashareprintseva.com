import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getSectionBySlug } from '$lib/services/sections';

export const load: PageServerLoad = async ({ params }) => {
	const { section } = params;

	const sectionData = await getSectionBySlug(section);

	if (!sectionData) error(404, 'page not found');

	return {
		section: sectionData,
		pageTitle: sectionData.title
	};
};
