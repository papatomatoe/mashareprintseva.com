<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const main = $derived(data.main);
	const pageTitle = $derived(data.pageTitle);
	const Content = $derived(data.main.content);
</script>

{#if main}
	<section class="main-page">
		<h2 class="v-h">{pageTitle}</h2>
		<div class="main-page__content">
			<Content />
		</div>
	</section>
{/if}

<style>
	.main-page {
		padding-top: 20px;
		height: 100%;
		margin: 0 auto;
	}

	.main-page__content {
		position: relative;
		width: 100%;
		height: 100%;
	}

	:global(.main-page__content img) {
		object-position: 40% 0;
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	@media (min-width: 1200px) {
		:global(.main-page__content img) {
			object-position: 0 -55px;
			height: 576px;
		}
	}
</style>
