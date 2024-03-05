import fs from 'fs';
import { STATIC_PATH, UPLOAD_PATH } from '$env/static/private';

const UPLOAD_DIR_PATH = `./${STATIC_PATH}/${UPLOAD_PATH}`;

export const intiUploadFolder = () => {
	try {
		if (fs.existsSync(UPLOAD_DIR_PATH)) return;

		fs.mkdirSync(UPLOAD_DIR_PATH);
	} catch (err) {
		throw new Error('Create Upload Folder Error');
	}
};
