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
	.admin-layout {
		display: grid;
		grid-template-rows: min-content 1fr;
		height: 100%;
	}

	.header {
		display: flex;
		align-items: center;
		gap: 22px;
		border-bottom: 2px solid var(--color--gray-85);
		padding: 12px 40px;
	}

	.header__logo {
		width: 205px;
	}

	.header__wrapper {
		display: flex;
		align-items: center;
		gap: 22px;
		margin-left: auto;
	}

	.header__user {
		color: var(--color--gray-30);
		font-weight: 600;
		font-size: 14px;
		line-height: 21px;
	}

	.header__logout {
		width: 84px;
	}

	.main {
		display: grid;
		grid-template-columns: 250px 1fr;
		transition: grid-template-columns 0.1s linear;
	}

	.main--collapsed {
		grid-template-columns: 58px 1fr;
	}

	.main__menu {
		position: relative;
		border-right: 2px solid var(--color--gray-85);
	}

	.main--dashboard {
		display: block;
	}

	.menu__collapse {
		display: grid;
		position: absolute;
		top: 40px;
		left: calc(100% - 18px);
		place-items: center;

		z-index: 1;

		transition: background-color 0.2s linear;
		cursor: pointer;
		outline: none;
		border: 2px solid var(--color--gray-85);
		border-radius: 50%;

		background-color: var(--color--gray-15);
		width: 40px;
		height: 40px;
	}
	.menu__collapse:hover,
	.menu__collapse:focus-visible {
		background-color: var(--color--primary);
	}
	.menu__collapse:active {
		background-color: var(--color--gray-30);
	}

	.menu__collapse--collapsed {
		transform: rotateZ(180deg);
	}

	.menu__container {
		overflow: hidden;
	}

	.menu__wrapper {
		padding: 55px 40px;
		width: 248px;
	}
	.menu__wrapper--collapsed {
		padding: 110px 15px 50px;
		width: 50px;
	}
	.menu__title {
		margin-bottom: 26px;
		padding: 0 7px;

		color: var(--color--primary);
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;

		text-transform: uppercase;
	}
	.menu__list {
		display: grid;
		gap: 10px;
	}

	.menu__link {
		display: flex;
		align-items: center;
		gap: 10px;

		transition: background-color 0.2s linear;
		border-radius: 4px;
		padding: 5px 7px;
		max-width: 120px;
	}

	.menu__link span {
		color: var(--color--black);
		font-weight: 400;
		font-size: 14px;
		line-height: 21px;
	}

	.menu__link:hover,
	.menu__link:focus-visible {
		background-color: var(--color--gray-85);
	}

	.menu__link:active {
		background-color: var(--color--primary);
		--color--icon: var(--color--white);
	}

	.menu__link:active span {
		color: var(--color--white);
	}

	.menu__link--current,
	.menu__link--current:hover,
	.menu__link--current:focus-visible,
	.menu__link--current:active {
		background-color: var(--color--primary);
		--color--icon: var(--color--white);
	}

	.menu__link--current span,
	.menu__link--current:hover span,
	.menu__link--current:focus-visible span,
	.menu__link--current:active span {
		color: var(--color--white);
	}

	.main__wrapper {
		position: relative;
	}
</style>
