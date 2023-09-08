import ImageKit from 'ImageKit';

import {
	IMAGEKIT_PUBLIC_API_KEY,
	IMAGEKIT_PRIVATE_API_KEY,
	IMAGEKIT_URL_ENDPOINT
} from '$env/static/private';

export const imageKit = new ImageKit({
	publicKey: IMAGEKIT_PUBLIC_API_KEY,
	privateKey: IMAGEKIT_PRIVATE_API_KEY,
	urlEndpoint: IMAGEKIT_URL_ENDPOINT
});
