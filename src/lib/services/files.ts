// import { STATIC_PATH, UPLOAD_PATH } from '$env/static/private';
import { prisma } from '$lib/db';
// import { getTotalSize } from '$lib/helpers/getDirSize';

export const getFileList = async (page = 0, perPage = 50) => {
	// const info = getTotalSize(`./${STATIC_PATH}/${UPLOAD_PATH}`);
	const total = await prisma.file.count();
	const files = await prisma.file.findMany({
		take: perPage,
		skip: page * perPage,
		orderBy: { createdAt: 'asc' }
	});

	const pages = Math.ceil(total / perPage);

	return { files, pagination: { page, perPage, pages, total } };
};
