import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';
import { imageKit } from '$lib/database/static';

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const file = formData.get('file') as string;
	const fileName = formData.get('fileName') as string;

	if (!file || !fileName) throw error(400, 'Invalid Request Data');

	const data = await imageKit.upload({ file, fileName });

	return json(data);
};
