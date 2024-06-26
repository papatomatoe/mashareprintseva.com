import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/database/db';

export const POST: RequestHandler = async ({ request }) => {
	const search = await request.json();

	try {
		const response = await db.project.findMany({
			where: { OR: [{ title: { contains: search } }, { slug: { contains: search } }] }
		});

		return json(response);
	} catch (e) {
		throw error(500, 'Something went wrong...');
	}
};
