export const removeEmptyTags = (HTMLString: string) =>
	HTMLString.replace(/<[^/>]*>\s*<\/[^>]*>/g, '');
