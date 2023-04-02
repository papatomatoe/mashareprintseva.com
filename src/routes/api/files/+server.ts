import { error, json } from '@sveltejs/kit';
import { v2 as cloudinary, type UploadApiOptions } from 'cloudinary';
import {
	CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET,
	CLOUDINARY_CLOUD_NAME
} from '$env/static/private';

const cloudinaryConfig = cloudinary.config({
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET,
	secure: true
});
export const POST = async ({ request, fetch }) => {
	const formData = await request.formData();
	const file = formData.get('file');

	const result = await cloudinary.uploader.upload(file as string);

	console.log(result);

	return json('ok');
};
