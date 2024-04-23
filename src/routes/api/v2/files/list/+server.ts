import { error, json } from '@sveltejs/kit';
import { getFileList } from '$lib/database/db';
export const POST = async ({ request }) => {
	try {
		const { files, page, pages, perPage, total } = await getFileList();

		return json({ files, page, pages, perPage, total });
	} catch (e) {
		throw error(500, 'Something went wrong...');
	}
};
