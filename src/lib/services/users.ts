import { db } from '$lib/database/db';

export const getUsers = async () => {
	const users = await db.user.findMany({
		select: {
			id: true,
			username: true,
			createdAt: true,
			role: true
		}
	});

	return users;
};
