<script lang="ts">
	import Check from '$lib/components/icons/Check.svelte';
	import CheckAll from '$lib/components/icons/CheckAll.svelte';
	export let checked = false;
	export let name = '';
	export let isCheckedAll = false;
	export let width = 14;
	export let height = 14;

	$: size = width <= 14 ? 'sm' : 'md';
</script>

<label>
	<input class="input" {name} type="checkbox" on:change bind:checked />
	<div class="element" style:width="{width}px" style:height="{height}px">
		{#if isCheckedAll}
			<div class="element__icon"><CheckAll /></div>
		{:else}
			<div class="element__icon"><Check {size} /></div>
		{/if}
	</div>
</label>

<style>
	.input {
		display: none;
	}

	.element {
		display: grid;
		place-items: center;
		width: 14px;
		height: 14px;
		background-color: #fff;
		border: 1px solid #858585;
		border-radius: 4px;
		cursor: pointer;
	}

	.element__icon {
		display: none;
	}

	.input:checked + .element {
		border-color: #858585;
		background-color: #858585;
	}
	.input:checked + .element .element__icon {
		display: grid;
		--color-icon: #fff;
	}
</style>
