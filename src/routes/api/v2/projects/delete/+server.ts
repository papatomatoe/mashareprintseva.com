import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$/lib/database';

export const DELETE: RequestHandler = async ({ request }) => {
	const ids: string[] = await request.json();

	if (!ids || ids.length === 0) throw error(400, 'Invalid Request Data');

	try {
		const { count } = await db.project.deleteMany({ where: { id: { in: ids } } });

		let deletedIds = [];

		if (count === ids.length) {
			deletedIds = [...ids];
		} else {
			const notDeletedProjects = await db.project.findMany({ where: { id: { in: ids } } });

			deletedIds = [
				...notDeletedProjects
					.filter((section) => ids.includes(section.id))
					.map((section) => section.id)
			];
		}

		return json(deletedIds);
	} catch (e) {
		console.error(e);
		throw error(500, 'Something went wrong...');
	}
};
