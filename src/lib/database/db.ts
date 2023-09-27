import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();

export const getFileList = async () => {
	const files = await db.file.findMany();
	const total = files.length;

	return { total, files };
};
