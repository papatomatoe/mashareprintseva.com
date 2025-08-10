import type { Actions, PageServerLoad } from './$types';
import { addBioPageData, getBioPageAdminData } from '$/lib/services/bio';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { bioPageSchema, type BioPageSchemaType } from '$/lib/validators/bio';
import { zod } from 'sveltekit-superforms/adapters';
import type { BioPageType, FormMessageType } from '$/lib/types';

export const load: PageServerLoad = async () => {
	const bio = await getBioPageAdminData();

	const form = await superValidate(bio, zod(bioPageSchema));

	return { form, pageTitle: 'Admin | Bio Page' };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate<BioPageSchemaType, FormMessageType>(
			request,
			zod(bioPageSchema)
		);

		if (!form.valid) {
			return fail(400, { form });
		}

		const response = await addBioPageData(form.data as BioPageType);

		if (!response) return message(form, { status: 'error', text: 'Saving data error' });

		return message(form, { status: 'success', text: 'Bio Page data has been saved' });
	}
} satisfies Actions;
