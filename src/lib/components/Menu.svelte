<script lang="ts">
	import { page } from '$app/stores';
	import type { Menu } from '$lib/types/menu';

	let { items, onClose }: { items: Menu[]; onClose: () => void } = $props();

	const currentPath = $derived($page.url.pathname);
	const menu = $derived([...items, { title: 'Bio', slug: 'bio' }]);
</script>

{#if items.length}
	<ul class="menu">
		{#each menu as item (item.title)}
			<li class="menu__item">
				{#if currentPath === `/${item.slug}`}
					<a class="link link--current">{item.title}</a>
				{:else}
					<a class="link" href="/{item.slug}" onclick={onClose}>
						{item.title}
					</a>
				{/if}
			</li>
		{/each}
	</ul>
{/if}

<style>
	.menu__item {
		margin-bottom: 20px;
		text-align: center;
	}

	.menu__item:last-of-type {
		margin-bottom: 20px;
	}

	.link {
		font-weight: normal;
		font-size: 17px;
		line-height: 1.5;
		font-family: var(--font--secondary);
		color: var(--color--gray-95);
		font-style: normal;
	}

	.link--current {
		border-bottom: 1px solid var(--color--white);
	}

	@media (min-width: 768px) {
		.menu {
			display: flex;
			width: 100%;
			align-items: center;
			justify-content: space-between;
			gap: 20px;
		}

		.menu__item {
			margin-bottom: 0;
		}

		.menu__item:last-of-type {
			margin-bottom: 0;
		}

		.link {
			font-size: 14px;
			color: var(--color--gray-50);
		}

		.link--current {
			border-color: var(--color--gray-50);
		}
	}

	@media (min-width: 1200px) {
		.menu {
			align-items: center;
		}

		.menu__item {
			margin: 0;
		}

		.menu__item:last-of-type {
			margin: 0;
		}

		.link {
			font-size: 17px;
			transition: color 0.3s linear;
		}

		.link[href]:hover,
		.link[href]:focus {
			color: var(--color--primary);

			transition: color 0.3s linear;
		}

		.link[href]:active {
			opacity: 0.5;
		}
	}
</style>
