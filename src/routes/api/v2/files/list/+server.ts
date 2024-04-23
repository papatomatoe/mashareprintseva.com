import { error, json } from '@sveltejs/kit';
import { getFileList } from '$lib/database/db';
export const POST = async ({ request }) => {
	const perPage = await request.json();
	try {
		const data = await getFileList(0, perPage);

		return json({ ...data });
	} catch (e) {
		throw error(500, 'Something went wrong...');
	}
};
