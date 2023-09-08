import { error, json } from '@sveltejs/kit';
import { imageKit } from '$lib/database/static.js';

export const POST = async ({ request }) => {
	const limit = await request.json();

	if (!limit) throw error(400, 'Invalid Request Data');

	try {
		const response = await imageKit.listFiles({ skip: 0, limit });
		return json(response);
	} catch (e) {
		throw error(500, 'Something went wrong...');
	}
};
