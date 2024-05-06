import { error, json } from '@sveltejs/kit';
import { getFileList } from '$lib/services/files';
export const POST = async ({ request }) => {
	const { perPage, page } = await request.json();
	try {
		const data = await getFileList(page, perPage);

		return json({ ...data });
	} catch (e) {
		throw error(500, 'Something went wrong...');
	}
};
