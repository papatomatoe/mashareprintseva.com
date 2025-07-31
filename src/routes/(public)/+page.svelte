<script lang="ts">
	import type { PageData } from './$types';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();
</script>

<section class="main-page">
	<h2 class="v-h">{data.pageTitle}</h2>
	<div class="main-page__content">
		{#if data.main}
			{@html data.main.content}
		{/if}
	</div>
</section>

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

	@media (min-width: 1200px) {
		:global(.main-page__content img) {
			height: 576px;
			object-position: 0 -55px;
		}
	}
</style>
