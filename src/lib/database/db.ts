import { STATIC_PATH, UPLOAD_PATH } from '$env/static/private';
import { PRISMA_ERROR } from '$lib/constants/prismaErrors';
import { getTotalSize } from '$lib/utils/getDirSize';
import { PrismaClient } from '@prisma/client';
import type { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const db = new PrismaClient();

export const getFileList = async (page = 0, perPage = 50) => {
	const info = getTotalSize(`./${STATIC_PATH}/${UPLOAD_PATH}`);
	const total = await db.file.count();
	const files = await db.file.findMany({
		take: perPage,
		skip: page * perPage,
		orderBy: { createdAt: 'desc' }
	});

	const pages = Math.ceil(total / perPage);

	return { info, files, pagination: { page, perPage, pages, total } };
};

export const createSection = async (data: any) => {
	try {
		await db.section.create({
			data
		});

		return { success: true };
	} catch (e) {
		console.log(e);
		const prismaError = e as PrismaClientKnownRequestError;

		const errorMessage = PRISMA_ERROR[prismaError.code];
		const errorTarget = prismaError.meta?.target;

		const message = errorTarget ? `${errorMessage}: "${errorTarget}"` : prismaError.message;

		return { success: false, message };
	}
};
