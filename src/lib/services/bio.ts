import { db } from '$/lib/database';

export const getBioPageData = async () => {
	try {
		return await db.bio.findFirst({
			where: { published: true },
			select: {
				title: true,
				epigraph: true,
				content: true,
				image: true
			}
		});
	} catch (e) {
		console.log(e);
		return;
	}
};
