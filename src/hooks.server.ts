import { BASE_URL } from '$env/static/private';
import { db } from '$lib/database/db';
import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

export const handle = (async ({ event, resolve }) => {
	event.locals.pb = new PocketBase(BASE_URL);

	const session = event.cookies.get('session');

	if (!session) {
		return await resolve(event);
	}

	const user = await db.user.findUnique({
		where: {
			userAuthToken: session
		},
		select: {
			username: true,
			role: true
		}
	});

	if (user) {
		event.locals.user = {
			username: user.username,
			role: user.role.name
		};
	}

	return await resolve(event);
}) satisfies Handle;
