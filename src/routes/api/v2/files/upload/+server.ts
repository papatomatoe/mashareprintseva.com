import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import sharp from 'sharp';
import { nanoid } from 'nanoid';
import fs from 'fs/promises';
import { db } from '$lib/database/db';
import { STATIC_DIR } from '$env/static/private';
const IMAGE_TYPES = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];

export const POST: RequestHandler = async ({ request }) => {
	const formData = await request.formData();
	const files = formData.getAll('files');

	if (!files || !files.length) throw error(400, 'Invalid Request Data');

	const savedFiles: unknown[] = [];

	await Promise.all(
		files.map(async (fileData: FormDataEntryValue) => {
			if (fileData) {
				const file = fileData as File;
				const splittedFileName = file.name.split('.');
				const name = splittedFileName.slice(0, splittedFileName.length - 1).join('.');
				const extension = splittedFileName[splittedFileName.length - 1];

				const uniqueFileName = `${name}__${nanoid()}.${extension}`;

				const fileBuffer = await file.arrayBuffer();

				const fileInfo: {
					url?: string;
					thumbnail?: string;
					name?: string;
					uniqueName?: string;
					fileType?: string;
				} = {};

				if (IMAGE_TYPES.includes(file.type)) {
					const uniqueName = `${name}__${nanoid()}`;
					const fullSize = `${uniqueName}.webp`;
					const thumbnail = `${uniqueName}__thumbnail.webp`;

					await sharp(fileBuffer)
						.resize({ width: 800, fit: 'inside' })
						.webp({ quality: 80 })
						.toFile(`./${STATIC_DIR}/${fullSize}`)
						.then(() => {
							fileInfo.url = `/${STATIC_DIR}/${fullSize}`;
							fileInfo.fileType = 'image/webp';
							fileInfo.name = name;
						});

					await sharp(fileBuffer)
						.resize({ width: 100, fit: 'inside' })
						.webp({ quality: 80 })
						.toFile(`./${STATIC_DIR}/${thumbnail}`)
						.then(() => {
							fileInfo.thumbnail = `/${STATIC_DIR}/${thumbnail}`;
						});
				} else {
					const buffer = Buffer.from(fileBuffer);

					await fs
						.writeFile(`./${STATIC_DIR}/${uniqueFileName}`, buffer)
						.then(() => {
							fileInfo.url = `/${STATIC_DIR}/${uniqueFileName}`;
							fileInfo.fileType = file.type;
							fileInfo.name = name;
							fileInfo.uniqueName = uniqueFileName;
						})
						.catch((err) => {
							console.error(err);
							throw error(400, 'File save error');
						});
				}

				const dbResponse = await db.file.create({
					data: {
						name: fileInfo.name || '',
						uniqueName: fileInfo.uniqueName || nanoid(),
						url: fileInfo.url || '',
						thumbnail: fileInfo.thumbnail || '',
						fileType: fileInfo.fileType || ''
					}
				});

				dbResponse && savedFiles.push(dbResponse);
			}
		})
	);

	return json(savedFiles);
};
