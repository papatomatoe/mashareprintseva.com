<script lang="ts">
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$/lib/components/admin/AppSidebar.svelte';
	import Separator from '$/lib/components/ui/separator/separator.svelte';
	import Breadcrumbs from '$/lib/components/admin/Breadcrumbs.svelte';

	type Props = {
		data: LayoutData;
		children: Snippet;
	};

	let { data, children }: Props = $props();

	let collapseMenu = $state(false);

	const handleCollapseMenu = () => {
		collapseMenu = !collapseMenu;
	};

	const user = $derived(data.user);
	const pageTitle = $derived(page.data.pageTitle);
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<Sidebar.Provider>
	<AppSidebar {user} />
	<Sidebar.Inset>
		<header
			class="group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) flex h-[60px] shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear"
		>
			<div class="flex h-full w-full items-center gap-1 px-4 lg:gap-2">
				<Sidebar.Trigger class="size-[44px]" />
				<Separator orientation="vertical" class="mx-2 data-[orientation=vertical]:h-full" />
				<Breadcrumbs />
			</div>
		</header>
		<main>
			{@render children()}
		</main>
	</Sidebar.Inset>
</Sidebar.Provider>

<style>
</style>
