import { STATIC_PATH, UPLOAD_PATH } from '$env/static/private';
import { db } from '$/lib/database';
import { getTotalSize } from '$lib/helpers/getDirSize';

export const getFileList = async (page = 0, perPage = 50) => {
	const info = getTotalSize(`./${STATIC_PATH}/${UPLOAD_PATH}`);
	const total = await db.file.count();
	const files = await db.file.findMany({
		take: perPage,
		skip: page * perPage,
		orderBy: { createdAt: 'asc' }
	});

	const pages = Math.ceil(total / perPage);

	return { info, files, pagination: { page, perPage, pages, total } };
};
