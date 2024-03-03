import fs from 'fs';
import path from 'path';

export const getAllFiles = function (dirPath: string, filePaths?: string[]) {
	const files = fs.readdirSync(dirPath);

	let arrayOfFiles = filePaths || [];

	files.forEach(function (file) {
		if (fs.statSync(dirPath + '/' + file).isDirectory()) {
			arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
		} else {
			arrayOfFiles.push(path.join(dirPath, file));
		}
	});

	return arrayOfFiles;
};

export const convertBytes = function (bytes: number) {
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

	if (bytes === 0) return '0';

	const d = Math.log(bytes) / Math.log(1024);

	const i = Math.floor(d);

	if (i === 0) return bytes + ' ' + sizes[i];

	return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};

export const getTotalSize = function (directoryPath: string) {
	const arrayOfFiles = getAllFiles(directoryPath);

	let totalSize = 0;

	arrayOfFiles.forEach(function (filePath) {
		totalSize += fs.statSync(filePath).size;
	});

	return { size: convertBytes(totalSize), bytes: totalSize };
};
