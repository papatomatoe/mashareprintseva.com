<script lang="ts">
	import '$lib/styles/globals.css';
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import type { PageData } from './$types';
	import type { Snippet } from 'svelte';

	type Props = {
		data: PageData;
		children: Snippet;
	};

	let { data, children }: Props = $props();

	const pageTitle = $derived(page.data.pageTitle);
	const menu = $derived(data.menu);
	const social = $derived(data.social);
</script>

<svelte:head>
	<title>Masha Reprintseva Embroidery & Design{pageTitle ? ` | ${pageTitle}` : ''}</title>
</svelte:head>

<div class="app-container">
	<Header {menu} {social} />
	<div class="container">
		<main class="content">
			{#if pageTitle}
				<h1 class="v-h">{pageTitle}</h1>
			{/if}
			{@render children()}
		</main>
		<Footer {social} />
	</div>
</div>

<style>
	.container {
		display: flex;
		position: relative;
		top: 0;
		flex-grow: 1;
		flex-direction: column;
		justify-content: space-between;
		z-index: 0;

		transition: top 0.2s linear;
	}

	.content {
		flex-grow: 1;
		align-items: center;
		margin: 0 auto;
		border-top: 1px solid var(--color--gray-85);
		padding-top: 0px;
		padding-bottom: 20px;
		width: 87%;
	}
	@media (min-width: 768px) {
		.container {
			transition: none;
		}
		.content {
			padding-top: 0;
			padding-bottom: 80px;
		}
	}
	@media (min-width: 1200px) {
		.container {
			margin: 0 auto;

			border-top: 1px solid var(--color--gray-85);
			width: 960px;
		}
		.content {
			border: none;
			width: 100%;
		}
	}
</style>
