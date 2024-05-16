import { db } from '$lib/database/db';

export const getMainPageData = async () => {
	try {
		const data = await db.mainPage.findFirst();
		return data;
	} catch (e) {
		console.error(e);
	}
};
