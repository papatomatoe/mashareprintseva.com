import { prisma } from '$/lib/db';
import type { BioPageType } from '$/lib/types';

export const getBioPageAdminData = async () => {
	try {
		return await prisma.bio.findFirst();
	} catch (e) {
		console.log(e);
	}
};

export const getBioPageData = async () => {
	try {
		return await prisma.bio.findFirst({
			where: { published: true },
			select: {
				title: true,
				epigraph: true,
				content: true,
				image: true
			}
		});
	} catch (e) {
		console.log(e);
	}
};

export const addBioPageData = async (data: BioPageType) => {
	try {
		return await prisma.bio.upsert({
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
