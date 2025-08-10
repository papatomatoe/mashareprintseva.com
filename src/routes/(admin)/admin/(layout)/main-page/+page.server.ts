import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { addMainPageData, getMainPageData } from '$lib/services/main';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { mainPageSchema } from '$/lib/validators/main';
import type { MainPageType } from '$/lib/types';

export const load: PageServerLoad = async () => {
	const mainPageData = await getMainPageData();

	const form = await superValidate(mainPageData, zod(mainPageSchema));

	return { form, pageTitle: 'Admin | Main Page' };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(mainPageSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const response = await addMainPageData(form.data as MainPageType);

		if (!response) return message(form, { status: 'error', text: 'Saving data error' });

		return message(form, { status: 'success', text: 'Main Page data has been saved' });
	}
};
