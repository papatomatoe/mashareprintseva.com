import { db } from '$/lib/database';
import type { MenuType } from '$/lib/types';

export const getMainMenuData = async (): Promise<MenuType[] | undefined> => {
	try {
		await db.section.findMany({
			where: { published: true },
			select: { id: true, title: true, order: true, slug: true }
		});
	} catch (e) {
		console.log(e);
		return;
	}
};

export const getSocialMenuData = async () => {
	try {
		return await db.social.findMany();
	} catch (e) {
		console.log(e);
	}
};
