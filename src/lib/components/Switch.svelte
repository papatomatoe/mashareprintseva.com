<script lang="ts">
	export let label = '';
	export let checked = false;
	export let name = '';
</script>

<label class="switch">
	<span class="switch__label" class:switch__label--checked={checked}>{label}</span>
	<input class="switch__input" type="checkbox" {name} bind:checked />
	<div class="switch__element" />
</label>

<style>
	.switch {
		display: flex;
		align-items: center;
		gap: 13px;
	}
	.switch__input {
		display: none;
	}
	.switch__element {
		position: relative;
		width: 33px;
		height: 19px;
		background-color: #fff;
		border: 1px solid #d8d8d8;
		border-radius: 10px;
	}

	.switch__element::after {
		position: absolute;
		content: '';
		width: 15px;
		height: 15px;
		top: 1px;
		left: 1px;
		background-color: #d8d8d8;
		border-radius: 50%;
		transition: left 0.1s ease-in-out;
	}
	.switch__input:checked + .switch__element {
		background-color: #90f3be;
		border-color: #21824e;
	}
	.switch__input:checked + .switch__element::after {
		background-color: #21824e;
		left: 15px;
	}
	.switch__label--checked {
		color: #21824e;
	}
</style>
