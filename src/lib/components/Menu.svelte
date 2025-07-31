<script lang="ts">
	import type { MenuType } from '$/lib/types';
	import { page } from '$app/state';

	type Props = {
		items: MenuType[];
		onclose: () => void;
	};

	let { items, onclose }: Props = $props();

	const currentPath = page.url.pathname;
	const menu = $derived([...items, { id: 'bio', title: 'Bio', slug: 'bio' }]);
</script>

{#if items.length}
	<ul class="menu">
		{#each menu as item (item.id)}
			<li class="menu__item">
				{#if currentPath === `/${item.slug}`}
					<!-- svelte-ignore a11y_missing_attribute -->
					<a class="link link--current">{item.title}</a>
				{:else}
					<a class="link" href="/{item.slug}" onclick={onclose}>
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
		color: var(--color--gray-95);
		font-style: normal;
		font-weight: normal;
		font-size: 17px;
		line-height: 1.5;
		font-family: var(--font--secondary);
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
			color: var(--color--gray-50);
			font-size: 14px;
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
			transition: color 0.3s linear;
			font-size: 17px;
		}

		.link[href]:hover,
		.link[href]:focus {
			transition: color 0.3s linear;
			color: var(--color--primary);
		}

		.link[href]:active {
			opacity: 0.5;
		}
	}
</style>
