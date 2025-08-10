import { prisma } from '$lib/db';
import type { MenuType } from '$/lib/types';

export const getMainMenuData = async (): Promise<MenuType[] | undefined> => {
	try {
		await prisma.section.findMany({
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
		return await prisma.social.findMany();
	} catch (e) {
		console.log(e);
	}
};
