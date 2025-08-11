<script lang="ts">
	import { page } from '$app/stores';
	import type { Menu } from '$lib/types/menu';

	let { items, onClose }: { items: Menu[]; onClose: () => void } = $props();

	const currentPath = $derived($page.url.pathname);
	const menu = $derived([{ title: 'main', slug: '' }, ...items, { title: 'bio', slug: 'bio' }]);
</script>

{#if items.length}
	<ul class="menu">
		{#each menu as item (item.title)}
			{@const path = `/${item.slug}`}
			<li class="menu__item">
				<a
					class="link"
					class:link--current={currentPath === path}
					href="/{item.slug}"
					onclick={onClose}
				>
					{item.title}
				</a>
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
		color: var(--color--gray-95);
		font-style: normal;
		font-weight: normal;
		font-size: 17px;
		line-height: 1.5;
		font-family: var(--font--secondary);
		text-transform: lowercase;
	}

	.link--current {
		border-bottom: 1px solid var(--color--white);
	}

	@media (min-width: 768px) {
		.menu {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 20px;
			width: 100%;
		}

		.menu__item {
			margin-bottom: 0;
		}

		.menu__item:last-of-type {
			margin-bottom: 0;
		}

		.link {
			color: var(--color--gray-30);
			font-size: 14px;
		}

		.link--current {
			border-color: var(--color--gray-30);
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
			transition: color 0.3s linear;
			font-size: 17px;
		}

		.link:not(.link--current):hover,
		.link:not(.link--current):focus-visible {
			transition: color 0.3s linear;
			color: var(--color--primary);
		}

		.link:not(.link--current):active {
			opacity: 0.5;
		}

		.link--current {
			cursor: auto;
		}
	}
</style>
