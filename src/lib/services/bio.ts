import { db } from '$lib/database/db';

export const getBioPageData = async () => {
	try {
		const data = await db.bio.findFirst();
		return data;
	} catch (e) {
		console.error(e);
	}
};
