import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
// import { db } from '$/lib/database';
import { getMainPageData } from '$lib/services/main';
import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { mainPageSchema, type MainPageSchemaType } from '$/lib/validators/main-page';
import type { FormMessageType } from '$/lib/types';

export const load: PageServerLoad = async () => {
	const mainPage = await getMainPageData();
	const form = await superValidate(zod4(mainPageSchema));
	return { form, mainPage, pageTitle: 'Admin | Main Page' };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate<MainPageSchemaType, FormMessageType>(
			request,
			zod4(mainPageSchema)
		);

		if (!form.valid) {
			return fail(400, { form });
		}

		// 	const published = Boolean(data.get('published'));
		// 	const content = data.get('content');

		// 	if (typeof content !== 'string') {
		// 		return fail(400, { invalid: true });
		// 	}

		// 	try {
		// 		await db.mainPage.upsert({
		// 			where: { title: 'mainPage' },
		// 			update: { published, content },
		// 			create: { title: 'mainPage', slug: '', content, published }
		// 		});
		// 		return { success: true };
		// 	} catch (e) {
		// 		console.log(e);
		// 		return fail(400, { success: false });
		// 	}
		// }

		return message(form, { status: 'success', message: 'TEST' });
	}
};
