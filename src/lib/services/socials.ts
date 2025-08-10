import { prisma } from '$lib/db';
import { getPrismaError } from '$lib/services/error';
import type { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const getSocials = async () => {
	try {
		const socials = await prisma.social.findMany();

		return socials;
	} catch (e) {
		console.error(e);
	}
};

export const createSocial = async (data: any) => {
	try {
		await prisma.social.create({ data });

		return { success: true };
	} catch (e) {
		console.error(e);
		const error = getPrismaError(e as PrismaClientKnownRequestError);

		return { success: false, ...error };
	}
};

export const deleteSocial = async (id: string) => {
	try {
		await prisma.social.delete({ where: { id } });

		return { success: true };
	} catch (e) {
		console.error(e);
		const error = getPrismaError(e as PrismaClientKnownRequestError);

		return { success: false, ...error };
	}
};

export const updateSocial = async (id: string, data: any) => {
	try {
		await prisma.social.update({ where: { id }, data });
		return { success: true };
	} catch (e) {
		console.error(e);

		const error = getPrismaError(e as PrismaClientKnownRequestError);

		return { success: false, ...error };
	}
};
