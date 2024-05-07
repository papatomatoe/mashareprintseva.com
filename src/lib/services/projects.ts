import { db } from '$lib/database/db';
import type { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getPrismaError } from '$lib/services/error';
export const getProjects = async () => {
	try {
		const projects = await db.project.findMany();
		const sections = await db.section.findMany();
		const projectWithSection = projects.map((project) => ({
			...project,
			section: sections?.find((section) => section.id === project.sectionId)
		}));
		return projectWithSection;
	} catch (e) {
		console.error(e);
	}
};
export const getProject = async (id: string) => {
	try {
		const project = await db.project.findUnique({ where: { id } });
		const section = await db.section.findUnique({ where: { id: project?.sectionId ?? '' } });

		return { ...project, section };
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
		const message = getPrismaError(e as PrismaClientKnownRequestError);

		return { success: false, message };
	}
};
export const updateProject = async (id: string, data: any) => {
	try {
		await db.project.update({ where: { id }, data });

		return { success: true };
	} catch (e) {
		console.log(e);

		const message = getPrismaError(e as PrismaClientKnownRequestError);

		return { success: false, message };
	}
};
