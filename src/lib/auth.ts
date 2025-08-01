import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';
import { getRequestEvent } from '$app/server';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { BETTER_AUTH_SECRET, BETTER_AUTH_URL } from '$env/static/private';

const prisma = new PrismaClient();

export const auth = betterAuth({
	secret: BETTER_AUTH_SECRET,
	url: BETTER_AUTH_URL,
	emailAndPassword: {
		enabled: true
	},
	database: prismaAdapter(prisma, {
		provider: 'postgresql'
	}),
	plugins: [sveltekitCookies(getRequestEvent)]
});
