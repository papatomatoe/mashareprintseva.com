import { readdir, readFile, unlink } from 'node:fs/promises';
import sharp from 'sharp';

const DIR_PATH = './static/images';
const fileTypes = ['jpeg', 'jpg', 'png'];

async function convertToAvif() {
	try {
		const fileNames = await readdir(DIR_PATH, { withFileTypes: true });

		fileNames.forEach(async (file) => {
			const isFile = file.isFile();
			const splittedFileType = file.name.split('.');
			const fileType = splittedFileType[splittedFileType.length - 1];
			const fileName = splittedFileType.slice(0, splittedFileType.length - 1).join('.');
			const filePath = `${DIR_PATH}/${file.name}`;

			if (isFile && fileTypes.includes(fileType)) {
				const buffer = await readFile(filePath);

				await sharp(buffer)
					.webp({ quality: 85 })
					.toFile(`${DIR_PATH}/${fileName}.avif`)
					.then(() => {
						unlink(filePath);
					});
			}
		});
		console.log('✓ DONE');
	} catch (err) {
		console.error(err);
	}
}

convertToAvif();
