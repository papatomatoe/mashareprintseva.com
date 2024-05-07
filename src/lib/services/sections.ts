import { db } from '$lib/database/db';
import { getPrismaError } from '$lib/services/error';
import type { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const createSection = async (data: any) => {
	try {
		await db.section.create({
			data
		});

		return { success: true };
	} catch (e) {
		console.log(e);

		const message = getPrismaError(e as PrismaClientKnownRequestError);

		return { success: false, message };
	}
};
export const updateSection = async (id: string, data: any) => {
	try {
		await db.section.update({ where: { id }, data });

		return { success: true };
	} catch (e) {
		console.log(e);

		const message = getPrismaError(e as PrismaClientKnownRequestError);

		return { success: false, message };
	}
};
export const getSection = async (id: string) => {
	try {
		const section = await db.section.findUnique({ where: { id } });
		const projects = await db.project.findMany({ where: { sectionId: section?.id } });
		return { ...section, projects };
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
