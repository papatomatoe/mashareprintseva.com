declare namespace svelteHTML {
	interface HTMLAttributes<T> {
		'on:click-outside'?: (
			event: CustomEvent<MouseEvent<ItemType>> & { target: EventTarget & T }
		) => void;
	}
}
