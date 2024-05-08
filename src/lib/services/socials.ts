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

export let createSocial = async (data: any) => {
	try {
		await db.social.create({ data });

		return { success: true };
	} catch (e) {
		console.log(e);

		const message = getPrismaError(e as PrismaClientKnownRequestError);

		return { success: false, message };
	}
};
