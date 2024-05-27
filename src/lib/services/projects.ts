import { db } from '$lib/database/db';
import type { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getPrismaError } from '$lib/services/error';
export const getAllProjects = async () => {
	try {
		const projects = await db.project.findMany();
		return projects;
	} catch (e) {
		console.error(e);
	}
};
export const getProjects = async (page = 0, perPage = 10) => {
	try {
		const total = await db.project.count();
		const projects = await db.project.findMany({
			take: perPage,
			skip: page * perPage,
			orderBy: { createdAt: 'asc' },
			include: { section: true }
		});
		const pages = Math.ceil(total / perPage);
		return { projects, pagination: { page, perPage, pages, total } };
	} catch (e) {
		console.error(e);
	}
};
export const getProject = async (id: string) => {
	try {
		const project = await db.project.findUnique({ where: { id }, include: { section: true } });
		return project;
	} catch (e) {
		console.error(e);
	}
};
export const createProject = async (data: any) => {
	const { section, ...projectData } = data;
	try {
		await db.project.create({
			data: {
				...projectData,
				...(section?.id && { section: { connect: { id: section.id } } })
			}
		});

		return { success: true };
	} catch (e) {
		console.error(e);
		const error = getPrismaError(e as PrismaClientKnownRequestError);

		return { success: false, ...error };
	}
};
export const updateProject = async (id: string, data: any) => {
	const { section, ...projectData } = data;

	try {
		await db.project.update({
			where: { id },
			data: {
				...projectData,
				section: section ? { connect: { id: section.id } } : { disconnect: true }
			}
		});

		return { success: true };
	} catch (e) {
		console.error(e);

		const error = getPrismaError(e as PrismaClientKnownRequestError);

		return { success: false, ...error };
	}
};

export const getProjectBySlug = async (slug: string) => {
	try {
		const project = await db.project.findUnique({
			where: { slug, published: true },
			include: {
				section: {
					include: {
						projects: true
					}
				}
			}
		});

		if (project) {
			const { section, ...restData } = project;

			return {
				...restData,
				restProjects: section?.projects.filter((proj) => proj.published && proj.id !== restData.id)
			};
		}

		return null;
	} catch (e) {
		console.error(e);
	}
};
