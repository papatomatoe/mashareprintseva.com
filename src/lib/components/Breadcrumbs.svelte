<script lang="ts">
	import { page } from '$app/stores';

	$: currentPath = $page.url.pathname;
	$: breadcrumbsData = currentPath
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
		color: #8a6f48;
	}

	.breadcrumbs__link {
		font-weight: 400;
		color: #8a6f48;
		transition: color 0.2s;
	}

	.breadcrumbs__link:hover,
	.breadcrumbs__link:focus-visible {
		color: #454545;
	}
	.breadcrumbs__link:active {
		color: #d8d8d8;
	}
	.breadcrumbs__link--current,
	.breadcrumbs__link--current:hover,
	.breadcrumbs__link--current:focus-visible,
	.breadcrumbs__link--current:active {
		color: #000;
	}
</style>
