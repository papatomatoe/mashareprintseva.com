import { prisma } from '$lib/db';
import { getPrismaError } from '$lib/services/error';
import type { Project } from '@prisma/client';
import type { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const createSection = async (data: any) => {
	// const { projects, ...sectionData } = data;
	try {
		// await prisma.section.create({
		// 	data: sectionData,
		// 	...(projects?.length && {
		// 		projects: { connect: projects.map((project: Project) => ({ id: project.id })) }
		// 	})
		// });

		return { success: true };
	} catch (e) {
		console.error(e);

		const error = getPrismaError(e as PrismaClientKnownRequestError);

		return { success: false, ...error };
	}
};

export const updateSection = async (id: string, data: any) => {
	try {
		const section = await prisma.section.findUnique({ where: { id }, include: { projects: true } });

		const existProjects = section?.projects;

		const { projects, ...sectionData } = data;

		const disconnectProjects = projects?.length
			? existProjects?.filter(
					(existsProject) => !projects.find((project: Project) => project.id === existsProject.id)
				)
			: existProjects;

		await prisma.section.update({
			where: { id },
			data: {
				...sectionData,
				projects: {
					...(disconnectProjects?.length && {
						disconnect: disconnectProjects?.map((project) => ({ id: project.id }))
					}),
					...(projects?.length && {
						connect: projects.map((project: Project) => ({ id: project.id }))
					})
				}
			}
		});

		return { success: true };
	} catch (e) {
		console.error(e);

		const message = getPrismaError(e as PrismaClientKnownRequestError);

		return { success: false, message };
	}
};
export const getSection = async (id: string) => {
	try {
		const section = await prisma.section.findUnique({ where: { id }, include: { projects: true } });
		return section;
	} catch (e) {
		console.error(e);
	}
};
export const getAllSections = async () => {
	try {
		const sections = await prisma.section.findMany();
		return sections;
	} catch (e) {
		console.error(e);
	}
};
export const getSections = async (page = 0, perPage = 10) => {
	try {
		const total = await prisma.section.count();
		const sections = await prisma.section.findMany({
			take: perPage,
			skip: page * perPage,
			orderBy: { createdAt: 'asc' }
		});
		const pages = Math.ceil(total / perPage);
		return { sections, pagination: { page, perPage, pages, total } };
	} catch (e) {
		console.error(e);
	}
};

export const getSectionBySlug = async (slug: string) => {
	try {
		return await prisma.section.findFirst({
			where: { slug, published: true },
			select: {
				title: true,
				altTitle: true,
				subtitle: true,
				image: true,
				content: true,
				slug: true,
				projects: {
					where: { published: true },
					select: {
						id: true,
						title: true,
						slug: true,
						image: true
					}
				}
			}
		});
	} catch (e) {
		console.error(e);
	}
};
