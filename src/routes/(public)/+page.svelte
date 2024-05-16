<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: main = data.main;
	$: pageTitle = data.pageTitle;
</script>

{#if main}
	<section class="main-page">
		<h2 class="v-h">{pageTitle}</h2>
		<div class="main-page__content">
			{@html main.content}
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
