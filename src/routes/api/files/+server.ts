import { json, error } from '@sveltejs/kit';
import { v2 as cloudinary } from 'cloudinary';

export const POST = async ({ request }) => {
	const formData = await request.formData();
	const max_results = formData.get('max_results');
	const next_cursor = formData.get('next_cursor') as string | undefined;

	console.log(next_cursor);

	try {
		const response = await cloudinary.search
			.expression('thumbnail OR format:pdf')
			.max_results(Number(max_results))
			.next_cursor(next_cursor)
			.sort_by('created_at', 'desc')
			.execute();

		if (!response) throw error(400, 'not found');

		return json({ data: response });
	} catch (e) {
		console.log(e);
		throw error(500, 'Something went wrong...');
	}
};
