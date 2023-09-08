import { json, error } from '@sveltejs/kit';
import { imageKit } from '$lib/database/static';

export const POST = async ({ request }) => {
	const search = await request.json();

	const searchQuery = `name:"${search}"`;

	try {
		const response = await imageKit.listFiles({ searchQuery });

		return json(response);
	} catch (e) {
		throw error(500, 'Something went wrong...');
	}
};
