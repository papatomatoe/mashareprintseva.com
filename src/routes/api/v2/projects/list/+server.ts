import { error, json } from '@sveltejs/kit';
import { getProjects } from '$lib/services/projects';
export const POST = async ({ request }) => {
	const { perPage, page } = await request.json();
	try {
		const data = await getProjects(page, perPage);

		return json({ ...data });
	} catch (e) {
		throw error(500, 'Something went wrong...');
	}
};
