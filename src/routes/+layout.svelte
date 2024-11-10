<script lang="ts">
	import '../styles/globals.css';
	import { page } from '$app/stores';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	$: pageTitle = $page.data.pageTitle;
	$: menu = data.menu;
	$: social = data.social;
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
			<slot />
		</main>
		<Footer {social} />
	</div>
</div>

<style>
	.container {
		position: relative;
		top: 0;
		z-index: 0;

		display: flex;
		flex-grow: 1;
		flex-direction: column;
		justify-content: space-between;

		transition: top 0.2s linear;
	}

	.content {
		width: 87%;
		margin: 0 auto;
		padding-top: 0px;
		padding-bottom: 20px;
		align-items: center;
		flex-grow: 1;
		border-top: 1px solid var(--color--gray-85);
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
			width: 960px;
			margin: 0 auto;

			border-top: 1px solid var(--color--gray-85);
		}
		.content {
			width: 100%;
			border: none;
		}
	}
</style>
