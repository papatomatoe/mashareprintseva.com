<script lang="ts">
	import { page } from '$app/stores';
	import Logo from '$lib/components/Logo.svelte';
	import icons from '$lib/components/icons';
	import { ADMIN_MENU } from '$lib/constants/adminMenu';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	export let data;
	let collapseMenu = false;

	const handleCollapseMenu = () => {
		collapseMenu = !collapseMenu;
	};

	const getIcon = (key: string) => icons[key as keyof typeof icons];

	$: user = data.user;
	$: pathname = $page.url.pathname;
	$: pageTitle = $page.data.pageTitle;
	$: isDashboardPage = $page.url.pathname === '/admin/dashboard';
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<div class="admin-layout">
	<header class="header">
		<a class="header__logo" href="/admin/dashboard"><Logo /></a>
		{#if user}
			<div class="header__wrapper">
				<p class="header__user">{user.username} ({user.role})</p>
				<form action="/admin/logout" method="POST">
					<button class="button header__logout" type="submit">logout</button>
				</form>
			</div>
		{/if}
	</header>
	<main class="main" class:main--dashboard={isDashboardPage} class:main--collapsed={collapseMenu}>
		{#if !isDashboardPage}
			<div class="main__menu menu">
				<button
					class="menu__collapse"
					class:menu__collapse--collapsed={collapseMenu}
					type="button"
					aria-label="collapse menu"
					on:click={handleCollapseMenu}
				>
					<svg
						width="21"
						height="17"
						viewBox="0 0 21 17"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M8 1L1 8.5L8 16M14 1L7 8.5L14 16M20 1L13 8.5L20 16"
							stroke="#D8D8D8"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
				<div class="menu__container">
					<div class="menu__wrapper" class:menu__wrapper--collapsed={collapseMenu}>
						{#if !collapseMenu}
							<p class="menu__title">Sections</p>
						{/if}
						<ul class="menu__list">
							{#each ADMIN_MENU as item (item.id)}
								<li class="menu__item">
									<a
										class="menu__link"
										class:menu__link--current={pathname === item.href}
										href={item.href}
									>
										<svelte:component this={getIcon(item.id)} />
										{#if !collapseMenu}
											<span>{item.title}</span>
										{/if}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		{/if}

		<div>
			{#if !isDashboardPage}
				<Breadcrumbs />
			{/if}
			<slot />
		</div>
	</main>
</div>

<style>
	.admin-layout {
		height: 100%;
		display: grid;
		grid-template-rows: min-content 1fr;
	}

	.header {
		display: flex;
		padding: 12px 40px;
		align-items: center;
		gap: 22px;
		border-bottom: 2px solid #d8d8d8;
	}

	.header__logo {
		width: 205px;
	}

	.header__wrapper {
		margin-left: auto;
		display: flex;
		align-items: center;
		gap: 22px;
	}

	.header__user {
		font-weight: 600;
		font-size: 14px;
		line-height: 21px;
		color: #454545;
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
		border-right: 2px solid #d8d8d8;
	}

	.main--dashboard {
		display: block;
	}

	.menu__collapse {
		position: absolute;
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		top: 40px;
		left: calc(100% - 18px);
		border-radius: 50%;

		background-color: #252525;
		border: 2px solid #d8d8d8;
		cursor: pointer;
		outline: none;

		transition: background-color 0.2s linear;
	}
	.menu__collapse:hover,
	.menu__collapse:focus-visible {
		background-color: #8a6f48;
	}
	.menu__collapse:active {
		background-color: #454545;
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
		padding: 0 7px;
		margin-bottom: 26px;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;

		text-transform: uppercase;

		color: #8a6f48;
	}
	.menu__list {
		display: grid;
		gap: 10px;
	}

	.menu__link {
		max-width: 120px;
		padding: 5px 7px;
		display: flex;
		align-items: center;
		gap: 10px;
		border-radius: 4px;

		transition: background-color 0.2s linear;
	}

	.menu__link span {
		font-weight: 400;
		font-size: 14px;
		line-height: 21px;

		color: #000000;
	}

	.menu__link:hover,
	.menu__link:focus-visible {
		background-color: #d8d8d8;
	}

	.menu__link:active {
		background-color: #8a6f48;
		--color-icon: #fff;
	}

	.menu__link:active span {
		color: #fff;
	}

	.menu__link--current,
	.menu__link--current:hover,
	.menu__link--current:focus-visible,
	.menu__link--current:active {
		background-color: #8a6f48;
		--color-icon: #fff;
	}

	.menu__link--current span,
	.menu__link--current:hover span,
	.menu__link--current:focus-visible span,
	.menu__link--current:active span {
		color: #fff;
	}
</style>
