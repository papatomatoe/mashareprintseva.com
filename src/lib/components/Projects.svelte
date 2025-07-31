<script lang="ts">
	import type { ProjectType } from '$/lib/types';

	type Props = {
		items: ProjectType[];
		sectionSlug: string;
	};

	let { sectionSlug, items }: Props = $props();
</script>

<ul class="projects">
	{#each items as item (item.id)}
		<li class="projects__item">
			<a class="projects__link" href={`/${sectionSlug}/${item.slug}`}>
				<h3 class="projects__title">{item.title}</h3>
				<div class="projects__image">
					<img src={item.image} alt={item.title} />
				</div>
			</a>
		</li>
	{/each}
</ul>

<style>
	.projects {
		margin-top: 40px;
	}
	.projects__item {
		margin-bottom: 40pxl;
	}
	.projects__link {
		display: flex;
		flex-direction: column;
		gap: 10px;
		height: 100%;
	}
	.projects__title {
		color: var(--color--gray-30);
		font-style: normal;
		font-weight: bold;
		font-size: 17px;
		line-height: 24px;
		font-family: var(--font--secondary);
	}
	.projects__image {
		position: relative;
		width: 100%;
		overflow: hidden;
	}

	@media (min-width: 768px) {
		.projects {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;

			gap: 25px;
		}
		.projects__item {
			margin-bottom: 0;
		}

		.projects__title {
			margin-top: auto;
		}
	}
	@media (min-width: 1200px) {
		.projects {
			gap: 80px;
		}

		.projects__title {
			transition: color 0.3s linear;
		}

		.projects__link img {
			transform: scale(1);
			transition: transform 0.2s linear;
		}

		.projects__link:hover img,
		.projects__link:focus-visible img {
			transform: scale(1.04);
		}
		.projects__link:hover .projects__title {
			color: var(--color--primary);
		}
		.projects__link:active img {
			opacity: 0.8;
		}
		.projects__link:active {
			opacity: 0.8;
		}
	}
</style>
