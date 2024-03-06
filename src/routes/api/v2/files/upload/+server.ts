import { STATIC_PATH, UPLOAD_PATH } from '$env/static/private';
import { db } from '$lib/database/db';
import { error, json } from '@sveltejs/kit';
import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import sharp from 'sharp';
import type { RequestHandler } from './$types';
import { IMAGE_TYPES, FILE_TYPES } from '$lib/constants/files';

const STATIC_FOLDER_PATH = `${STATIC_PATH}/${UPLOAD_PATH}`;

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
						.toFile(`./${STATIC_FOLDER_PATH}/${fullSize}`)
						.then(() => {
							fileInfo.url = `/${UPLOAD_PATH}/${fullSize}`;
							fileInfo.fileType = 'image/webp';
							fileInfo.name = name;
						});

					await sharp(fileBuffer)
						.resize({ width: 100, fit: 'inside' })
						.webp({ quality: 80 })
						.toFile(`./${STATIC_FOLDER_PATH}/${thumbnail}`)
						.then(() => {
							fileInfo.thumbnail = `/${UPLOAD_PATH}/${thumbnail}`;
						});
				} else {
					if (!FILE_TYPES.includes(file.type)) return;

					const buffer = Buffer.from(fileBuffer);

					await fs
						.writeFile(`./${STATIC_FOLDER_PATH}/${uniqueFileName}`, buffer)
						.then(() => {
							fileInfo.url = `/${UPLOAD_PATH}/${uniqueFileName}`;
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
