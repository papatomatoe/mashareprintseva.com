import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { auth } from '$/lib/auth';

import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { loginSchema, type LoginSchemaType } from '$/lib/validators/auth';
import { APIError } from 'better-auth/api';
import type { FormMessageType } from '$/lib/types';

export const load: PageServerLoad = async ({ request }) => {
	const session = await auth.api.getSession({
		headers: request.headers
	});

	if (session) throw redirect(302, '/admin/dashboard');

	const form = await superValidate(zod4(loginSchema));

	return { form, pageTitle: 'Admin | Login' };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate<LoginSchemaType, FormMessageType>(request, zod4(loginSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await auth.api.signInEmail({
				body: {
					email: form.data.email as string,
					password: form.data.password as string
				}
			});
		} catch (error) {
			if (error instanceof APIError) {
				return message(form, { status: 'error', text: error.message });
			}
			return message(form, { status: 'error', text: 'Login Error' });
		}

		return redirect(302, '/admin/dashboard');
	}
};
