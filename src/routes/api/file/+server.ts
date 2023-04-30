import { error, json } from '@sveltejs/kit';
import { v2 as cloudinary } from 'cloudinary';
import { nanoid } from 'nanoid';

export const POST = async ({ request }) => {
	const formData = await request.formData();
	const file = formData.get('file');
	const name = formData.get('name') as string;
	const publicId = nanoid();

	const splittedName = name ? name.split('.') : [];
	const nameWithoutExtension = splittedName.slice(0, splittedName.length - 1).join('');
	const fileName = `${nameWithoutExtension}${publicId}`;

	const prw = await cloudinary.uploader.upload(file as string, {
		public_id: `thumbnail_${fileName}`,
		height: 100,
		crop: 'pad'
	});
	const result = await cloudinary.uploader.upload(file as string, {
		public_id: fileName
	});

	return json({ result, prw });
};
