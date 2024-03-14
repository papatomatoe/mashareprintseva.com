import { error, json } from '@sveltejs/kit';
import { db } from '$lib/database/db';
export const POST = async ({ request }) => {
	try {
		const data = await request.json();

		// if (!skip || !take) throw error(400, 'Invalid Request Params');

		const response = await db.file.count();

		const files = {
			page: 0,
			totalPages: 0,
			totalFiles: 0
		};

		return json(response);
	} catch (e) {
		throw error(500, 'Something went wrong...');
	}
};
