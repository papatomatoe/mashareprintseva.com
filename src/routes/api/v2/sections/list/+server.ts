import { error, json } from '@sveltejs/kit';
import { getSections } from '$lib/services/sections';
export const POST = async ({ request }) => {
	const { perPage, page } = await request.json();
	try {
		const data = await getSections(page, perPage);

		return json({ ...data });
	} catch (e) {
		throw error(500, 'Something went wrong...');
	}
};
