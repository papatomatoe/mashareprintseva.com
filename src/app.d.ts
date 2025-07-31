// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

// declare global {
// 	namespace App {
// 		// interface Error {}
// 		// interface Locals {}
// 		// interface PageData {}
// 		// interface Platform {}
// 	}
// }

// src/app.d.ts
import PocketBase from 'pocketbase';

declare global {
	declare namespace App {
		interface Locals {
		}
	}
}

export {};
