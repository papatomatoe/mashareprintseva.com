import { redirect } from '@sveltejs/kit';
import {
	CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET,
	CLOUDINARY_CLOUD_NAME
} from '$env/static/private';
export const load = async ({ locals, fetch }) => {
	if (!locals.user) throw redirect(302, '/admin/login');

	const response = await fetch(
		`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/image`,
		{
			headers: {
				Authorization: `Basic ${Buffer.from(
					CLOUDINARY_API_KEY + ':' + CLOUDINARY_API_SECRET
				).toString('base64')}`
			}
		}
	);

	const files = await response.json();

	return {
		files,
		pageTitle: 'Admin | Files'
	};
};
