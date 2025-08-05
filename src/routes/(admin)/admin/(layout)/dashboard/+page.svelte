<script lang="ts">
	import { ADMIN_MENU } from '$lib/constants/adminMenu';
</script>

<h1 class="sr-only">Dashboard</h1>

<div class="mx-auto mb-[50%] mt-[135px] w-[80%] max-w-[685%]">
	<h2 class="mb-3 font-semibold uppercase">Sections</h2>

	<ul class="grid grid-cols-[repeat(auto-fit,_minmax(120px,_1fr))] gap-5">
		{#each ADMIN_MENU as item (item.id)}
			<li>
				<a
					class="hover:bg-[var(--color--primary)]/2 border-1 grid grid-rows-[50,_min-content] items-center justify-items-center gap-2 rounded-xl p-5 hover:border-[var(--color--primary)] hover:text-[var(--color--primary)]"
					href={item.href}
				>
					<item.icon width={30} height={30} />
					<span>{item.title}</span>
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
</style>
