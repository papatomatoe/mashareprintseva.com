import { db } from '$lib/database/db';
import { getPrismaError } from '$lib/services/error';
import type { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const getSocials = async () => {
	try {
		const socials = await db.social.findMany();

		return socials;
	} catch (e) {
		console.error(e);
	}
};

export const createSocial = async (data: any) => {
	try {
		await db.social.create({ data });

		return { success: true };
	} catch (e) {
		console.error(e);
		const error = getPrismaError(e as PrismaClientKnownRequestError);

		return { success: false, ...error };
	}
};

export const deleteSocial = async (id: string) => {
	try {
		await db.social.delete({ where: { id } });

		return { success: true };
	} catch (e) {
		console.error(e);
		const error = getPrismaError(e as PrismaClientKnownRequestError);

		return { success: false, ...error };
	}
};

export const updateSocial = async (id: string, data: any) => {
	try {
		await db.social.update({ where: { id }, data });
		return { success: true };
	} catch (e) {
		console.error(e);

		const error = getPrismaError(e as PrismaClientKnownRequestError);

		return { success: false, ...error };
	}
};
