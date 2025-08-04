<script lang="ts">
	import { getBreadcrumbsData } from '$/lib/components/Breadcrumbs.svelte';
	import { page } from '$app/state';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';

	const pathname = $derived(page.url.pathname);
	const breadcrumb = $derived(
		pathname === '/admin/dashboard'
			? [{ title: 'dashboard', path: '' }]
			: getBreadcrumbsData(pathname)
	);
</script>

<Breadcrumb.Root>
	<Breadcrumb.List>
		{#each breadcrumb as item, index}
			<Breadcrumb.Item class="hidden md:block">
				{#if !item.path || item.path === pathname}
					<Breadcrumb.Page>{item.title}</Breadcrumb.Page>
				{:else}
					<Breadcrumb.Link href={item.path}>{item.title}</Breadcrumb.Link>
				{/if}
			</Breadcrumb.Item>
			{#if index !== breadcrumb.length - 1}
				<Breadcrumb.Separator class="hidden md:block" />
			{/if}
		{/each}
	</Breadcrumb.List>
</Breadcrumb.Root>

<style>
</style>
