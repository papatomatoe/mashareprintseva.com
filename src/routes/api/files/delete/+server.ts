import { json, error } from '@sveltejs/kit';
import { imageKit } from '$lib/database/static';

export const DELETE = async ({ request }) => {
	const ids = await request.json();

	if (!ids || ids.length === 0) throw error(400, 'Invalid Request Data');

	try {
		const response = await imageKit.bulkDeleteFiles(ids);

		return json(response);
	} catch (e) {
		throw error(500, 'Something went wrong...');
	}
};
