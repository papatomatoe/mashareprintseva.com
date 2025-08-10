import { prisma } from '$lib/db';

export const getUsers = async () => {
	const users = await prisma.user.findMany({
		select: { id: true, createdAt: true, name: true, email: true }
	});

	return users;
};
