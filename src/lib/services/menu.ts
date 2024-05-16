import { db } from '$lib/database/db';

export const getMainMenuData = async () => {
	try {
		const sections = await db.section.findMany({ where: { published: true } });
		const menu = sections?.map((section) => ({
			id: section.id,
			title: section.title,
			order: section.order,
			slug: section.slug
		}));
		return menu;
	} catch (e) {
		console.error(e);
	}
};

export const getSocialMenuData = async () => {
	try {
		const social = await db.social.findMany();

		return social;
	} catch (e) {
		console.error(e);
	}
};
