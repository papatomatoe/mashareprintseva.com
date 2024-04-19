<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: main = data.main;
	$: pageTitle = data.pageTitle;
</script>

{#if main}
	<section class="content">
		<h2 class="v-h">{pageTitle}</h2>
		<div class="content__wrapper">
			<img class="content__image" src={main.image} alt={main.title} />
		</div>
	</section>
{/if}

<style>
	.content {
		padding-top: 20px;
		height: 100%;
		margin: 0 auto;
	}

	.content__wrapper {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.content__image {
		object-position: 40% 0;
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	@media (min-width: 1200px) {
		.content__image {
			object-position: 0 -55px;
			height: 576px;
		}
	}
</style>
