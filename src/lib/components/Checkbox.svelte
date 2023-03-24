<script lang="ts">
	import { Check, CheckAll } from '$lib/components/icons';
	export let checked = false;
	export let name = '';
	export let isCheckedAll = false;
</script>

<label>
	<input class="input" {name} type="checkbox" on:change bind:checked />
	<div class="element">
		{#if isCheckedAll}
			<div class="element__icon"><CheckAll /></div>
		{:else}
			<div class="element__icon"><Check /></div>
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
