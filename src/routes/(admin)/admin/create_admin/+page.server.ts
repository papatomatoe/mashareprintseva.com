import { fail, message, superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { registerSchema } from '$/lib/validators/auth';
import { zod4 } from 'sveltekit-superforms/adapters';
import { auth } from '$/lib/auth';
import { APIError } from 'better-auth/api';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(registerSchema));
	return { form, pageTitle: 'Register new user' };
};

export const actions: Actions = {
	default: async (request) => {
		const form = await superValidate(request, zod4(registerSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await auth.api.signUpEmail({
				body: {
					name: 'Admin',
					email: form.data.email as string,
					password: form.data.password as string
				}
			});
		} catch (error) {
			if (error instanceof APIError) {
				console.log('====SvelteKit====', error);
				return message(form, { status: 'error', text: error.message });
			}

			return message(form, { status: 'error', text: 'Signup Error' });
		}

		return redirect(302, '/admin/dashboard');
	}
};
