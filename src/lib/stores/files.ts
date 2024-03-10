import { writable } from 'svelte/store';

export const filesStore = writable<{ view: 'list' | 'grid' }>({
	view: 'list'
});
