import { PRISMA_ERROR } from '$lib/constants/prismaErrors';
import { db } from '$lib/database/db';
import type { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
export const updateSection = async (id: string, data: any) => {
	try {
		await db.section.update({ where: { id }, data });

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
export const getSection = async (id: string) => {
	try {
		const section = await db.section.findUnique({ where: { id } });
		return section;
	} catch (e) {
		console.error(e);
	}
};
export const getSections = async () => {
	try {
		const sections = await db.section.findMany();
		return sections;
	} catch (e) {
		console.error(e);
	}
};
