import { db } from '$lib/database/db';

export const getProjects = async () => {
	try {
		const projects = await db.project.findMany();
		return projects;
	} catch (e) {
		console.error(e);
	}
};
