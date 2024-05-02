<script context="module" lang="ts">
	export const getBreadcrumbsData = (path: string) =>
		path
			.split('/')
			.slice(1)
			.reduce<any>((acc, el, idx, arr) => {
				let path = '';
				for (let i = 0; i <= idx; i += 1) {
					path += `/${arr[i]}`;
				}

				if (el === 'admin') {
					return [...acc, { title: 'dashboard', path: '/admin/dashboard' }];
				}

				return [...acc, { title: el, path }];
			}, []);
</script>

<script lang="ts">
	import { page } from '$app/stores';

	$: currentPath = $page.url.pathname;
	$: breadcrumbsData =
		'breadcrumbs' in $page.data ? $page.data.breadcrumbs : getBreadcrumbsData(currentPath);
</script>

<ul class="breadcrumbs">
	{#each breadcrumbsData as item (item.title)}
		<li class="breadcrumbs__item">
			{#if item.path === currentPath}
				<p class="breadcrumbs__link breadcrumbs__link--current">{item.title}</p>
			{:else}
				<a class="breadcrumbs__link" href={item.path}>{item.title}</a>
			{/if}
		</li>
	{/each}
</ul>

<style>
	.breadcrumbs {
		display: flex;
		flex-wrap: wrap;
		padding: 40px 60px 0;
	}

	.breadcrumbs__item {
		position: relative;
	}
	.breadcrumbs__item:not(:last-of-type)::after {
		content: '/';
		padding: 0 6px 0 3px;
		font-weight: 500;
		color: var(--color--primary);
	}

	.breadcrumbs__link {
		font-weight: 400;
		color: var(--color--primary);
		transition: color 0.2s;
	}

	.breadcrumbs__link:hover,
	.breadcrumbs__link:focus-visible {
		color: var(--color--gray-30);
	}
	.breadcrumbs__link:active {
		color: var(--color--gray-85);
	}
	.breadcrumbs__link--current,
	.breadcrumbs__link--current:hover,
	.breadcrumbs__link--current:focus-visible,
	.breadcrumbs__link--current:active {
		color: var(--color--black);
	}
</style>
