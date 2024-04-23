import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();

export const getFileList = async (page = 0, perPage = 50) => {
	const total = await db.file.count();
	const files = await db.file.findMany({
		take: perPage,
		skip: page * 50,
		orderBy: { createdAt: 'desc' }
	});

	const pages = Math.ceil(total / perPage);

	return { files, pagination: { page, perPage, pages, total } };
};
