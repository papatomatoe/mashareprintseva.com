<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import Switch from '$lib/components/Switch.svelte';
	export let title = '';
	export let published = false;
	export let hasErrors = false;
</script>

<form
	class="form"
	method="POST"
	on:submit
	use:enhance={({ cancel }) => {
		if (hasErrors) cancel();
		return async ({ result }) => {
			if (result.type === 'redirect') {
				goto(result.location);
			} else {
				invalidateAll();
				await applyAction(result);
			}
		};
	}}
>
	<div class="form__top">
		<h1 class="form__title">{title}</h1>
		<Switch name="published" label="published" bind:checked={published} />
		<button class="button form__submit" type="submit">save</button>
	</div>
	<div class="form__bottom" class:form__bottom--has-side={$$slots.side}>
		<div class="form__left"><slot /></div>
		{#if $$slots.side}
			<slot name="side" />
		{/if}
	</div>
</form>

<style>
	.form {
		padding: 60px;
	}
	.form__top {
		display: flex;
		align-items: center;
		padding: 0 0 21px;
		margin-bottom: 43px;
		gap: 43px;
		border-bottom: 1px solid var(--color--gray-85);
	}
	.form__title {
		margin-right: auto;

		font-weight: 700;
		font-size: 24px;
		line-height: 36px;
	}
	.form__submit {
		width: 84px;
	}
	.form__bottom {
		display: grid;
		grid-template-columns: 1fr;
		gap: 37px;
	}

	.form__bottom--has-side {
		grid-template-columns: 1fr 287px;
	}

	.form__left {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 37px;
	}
</style>
