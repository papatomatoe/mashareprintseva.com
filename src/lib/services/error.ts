import { PRISMA_ERROR } from '$lib/constants/prismaErrors';
import type { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const getPrismaError = (e: PrismaClientKnownRequestError) => {
	const errorMessage = PRISMA_ERROR[e.code];
	const errorTarget = e.meta?.target;

	return errorTarget ? `${errorMessage}: "${errorTarget}"` : 'Server Error';
};
