import { STATIC_PATH, UPLOAD_PATH } from '$env/static/private';
import { getTotalSize } from '$lib/utils/getDirSize';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	const info = getTotalSize(`./${STATIC_PATH}/${UPLOAD_PATH}`);

	return json(info);
};
