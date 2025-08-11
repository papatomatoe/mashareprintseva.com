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
		margin: 0 auto;
		padding-top: 20px;
		height: 100%;
	}

	.main-page__content {
		position: relative;
		width: 100%;
		height: 100%;
	}

	:global(.main-page__content img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 40% 0;
	}
</style>
