import { writable } from 'svelte/store';
import type { ViewType } from './types';

export const filesStore = writable<{ view: ViewType }>({
	view: 'grid'
});
