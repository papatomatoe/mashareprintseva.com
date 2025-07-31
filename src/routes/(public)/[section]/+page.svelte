<script lang="ts">
	import type { PageData } from './$types';
	import Projects from '$lib/components/Projects.svelte';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();

	const section = $derived(data.section);
</script>

<div class="section">
	<h1 class="section__title">{section.altTitle || section.title}</h1>
	{#if section.subtitle}
		<p class="section__subtitle">{section.subtitle}</p>
	{/if}
	<section class="section__description">
		<h2 class="v-h">Section description</h2>

		<div class="section__image">
			<img src={section.image} alt={section.title} />
		</div>
		<div class="section__content">
			{@html section.content}
		</div>
	</section>
	<section class="section__projects">
		<h2 class="section__title">Projects</h2>

		{#if section && section.projects?.length}
			<Projects items={section.projects} sectionSlug={section?.slug ?? ''} />
		{:else}
			<p class="section__no-projects">The category contains no projects yet. Checkout soon...</p>
		{/if}
	</section>
</div>

<style>
	.section {
		display: block;

		border-top: 1px solid var(--color--gray-85);
		padding-top: 20px;
		height: 100%;
	}
	.section__title {
		margin-bottom: 50px;
		color: var(--color--black);
		font-style: normal;

		font-weight: bold;
		font-size: 28px;
		line-height: 1.5;
		font-family: var(--font--secondary);
	}
	.section__subtitle {
		margin-bottom: 60px;
		color: var(--color--gray-50);
		font-style: normal;
		font-weight: bold;
		font-size: 14px;
		line-height: 1.5;
		font-family: var(--font--secondary);
	}
	.section__description {
		margin-bottom: 50px;
		border-bottom: 1px solid var(--color--gray-85);
		padding-bottom: 30px;
	}
	.section__image {
		position: relative;
		margin-bottom: 70px;
		width: 100%;
		overflow: hidden;
	}

	.section__no-projects {
		margin: 40px 0;
	}

	@media (min-width: 768px) {
		.section__title {
			margin-top: 30px;
			margin-bottom: 0;
			font-size: 24px;
		}
		.section__subtitle {
			margin-top: 30px;
			margin-bottom: 20px;
		}
		.section__description {
			display: grid;

			grid-template-columns: min-content 1fr;
			align-items: start;

			gap: 50px;
			margin-top: 45px;
			padding-bottom: 60px;
		}
		.section__image {
			position: relative;
			grid-row: 1 / -1;
			width: 237px;
			height: 316px;
			overflow: hidden;
		}

		.section__no-projects {
			margin: 40px 0 0;
		}
	}
	@media (min-width: 1200px) {
		.section {
			border: none;
			width: 100%;
		}
		.section__description {
			gap: 70px;
		}
	}
</style>
