import { prisma } from '$/lib/db';
import type { MainPageType } from '$/lib/types';

export const getMainPageData = async () => {
	try {
		return await prisma.mainPage.findFirst();
	} catch (e) {
		console.log(e);
	}
};

export const addMainPageData = async (data: MainPageType) => {
	try {
		return await prisma.mainPage.upsert({
			where: { id: data.id },
			update: {
				...data
			},
			create: { ...data }
		});
	} catch (e) {
		console.log(e);
	}
};
