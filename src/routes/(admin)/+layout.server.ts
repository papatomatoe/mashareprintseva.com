import type { LayoutServerLoad } from './$types';
import { intiUploadFolder } from '$lib/utils/initUploadFolder';

export const load: LayoutServerLoad = async () => {
	intiUploadFolder();
	return {};
};
