export function debounce(cb: any, timeout: number) {
	return function (this: { lastCall: number; lastCallTimer: NodeJS.Timeout }, ...args: unknown[]) {
		const previousCall = this.lastCall;

		this.lastCall = Date.now();

		if (previousCall && this.lastCall - previousCall <= timeout) {
			clearTimeout(this.lastCallTimer);
		}

		this.lastCallTimer = setTimeout(() => cb(...args), timeout);
	};
}
