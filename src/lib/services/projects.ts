import { PRISMA_ERROR } from '$lib/constants/prismaErrors';
import { db } from '$lib/database/db';
import type { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getSections } from '$lib/services/sections';
export const getProjects = async () => {
	try {
		const projects = await db.project.findMany();
		const sections = await getSections();
		const projectWithSection = projects.map((project) => ({
			...project,
			section: sections?.find((section) => section.id === project.sectionId)
		}));
		return projectWithSection;
	} catch (e) {
		console.error(e);
	}
};
export const createProject = async (data: any) => {
	try {
		await db.project.create({
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
