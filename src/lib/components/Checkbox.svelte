<script lang="ts">
	export let checked = false;
	export let name = '';
	export let isCheckedAll = false;
</script>

<label>
	<input class="input" {name} type="checkbox" on:change bind:checked />
	<div class="element">
		{#if isCheckedAll}
			<svg width="8" height="2" viewBox="0 0 8 2" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1 1L7 1" stroke="var(--color-icon)" stroke-width="2" stroke-linecap="round" />
			</svg>
		{:else}
			<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M1 4.5L3.5 7L7.5 1"
					stroke="var(--color-icon)"
					stroke-width="2"
					stroke-linecap="round"
				/>
			</svg>
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

	.element svg {
		display: none;
	}

	.input:checked + .element {
		border-color: #858585;
		background-color: #858585;
	}
	.input:checked + .element svg {
		display: block;
		--color-icon: #fff;
	}
</style>
