<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let label = '';
	export let value = '';
	export let error = '';
	export let name = '';
	export let placeholder = '';
	export let type = 'text';
	export let required = false;
	export let isSlug = false;

	const typeAction = (node: HTMLInputElement) => {
		node.type = type;
	};

	const dispatch = createEventDispatcher();

	const handleClear = () => {
		value = '';
		error = '';
		dispatch('clearError');
		dispatch('input', '');
	};

	const handleRegenerate = () => {
		dispatch('regenerate');
	};

	const handleInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		dispatch('clearError');
		dispatch('input', target.value);
	};

	$: withIcon = $$slots.icon;
</script>

<label class="field">
	{#if label}
		<p class="field__label">
			<span class="field__text">
				{label}
			</span>
			{#if required}
				<span class="field__required">*</span>
			{/if}
		</p>
	{/if}
	<div class="field__wrapper">
		<div class="field__icon"><slot name="icon" /></div>
		<input
			class="field__input"
			class:field__input--error={error}
			class:field__input--with-icon={withIcon}
			use:typeAction
			bind:value
			on:change
			on:input={handleInput}
			{name}
			{placeholder}
		/>
		{#if isSlug}
			<button class="field__button" type="button" on:click={handleRegenerate}>
				<svg
					width="30"
					height="30"
					viewBox="0 0 30 30"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M15.3439 13.0831L22 13.6455L21.7765 7L19.3583 9.28682C18.3025 8.26377 16.9653 7.58297 15.5186 7.33634C14.0454 7.08517 12.532 7.29682 11.1824 7.94175C9.83295 8.58658 8.71342 9.63275 7.97168 10.9371C7.23002 12.2414 6.90061 13.7426 7.02606 15.2399C7.15151 16.7372 7.7261 18.1617 8.67522 19.3219C9.62449 20.4823 10.9035 21.3232 12.3422 21.7287C13.781 22.1343 15.3081 22.0841 16.7176 21.5852C18.127 21.0864 19.3491 20.1637 20.2218 18.9441L18.6627 17.8387C18.0152 18.7435 17.112 19.4234 16.0763 19.79C15.0408 20.1565 13.9201 20.1932 12.8637 19.8954C11.8072 19.5977 10.863 18.9788 10.1596 18.1188C9.4559 17.2587 9.02727 16.1989 8.93365 15.0815C8.84001 13.964 9.08618 12.8452 9.63751 11.8757C10.1887 10.9064 11.0177 10.134 12.0108 9.65943C13.0036 9.185 14.1146 9.03008 15.1955 9.21434C16.2327 9.39117 17.1971 9.87273 17.9691 10.6005L15.3439 13.0831Z"
						fill="var(--color-icon)"
					/>
				</svg>
			</button>
		{:else}
			<button
				class:field__button--visible={value}
				class="field__button field__button--clear"
				type="button"
				on:click={handleClear}
				><svg
					width="30"
					height="30"
					viewBox="0 0 30 30"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M13.4525 14.6066L8.42291 19.6362L9.97046 21.1837L15 16.1542L20.0295 21.1837L21.5771 19.6362L16.5476 14.6066L21.5771 9.57709L20.0295 8.02954L15 13.0591L9.97046 8.02954L8.42291 9.57709L13.4525 14.6066Z"
						fill="var(--color-icon)"
					/>
				</svg>
			</button>
		{/if}
	</div>
	{#if error}
		<p class="field__error">{error}</p>
	{/if}
</label>

<style>
	.field {
		position: relative;
		display: grid;
	}

	.field__text {
		font-size: 15px;
		line-height: 23px;
		color: #252525;
	}

	.field__required {
		color: #f00;
	}

	.field__wrapper {
		position: relative;
	}

	.field__input {
		width: 100%;
		padding: 5px 40px 5px 10px;
		background: #ffffff;
		border: 1px solid #d8d8d8;
		border-radius: 4px;

		font-weight: 300;
		font-size: 14px;
		line-height: 23px;
		font: var(--text--font);
		color: #454545;
		outline: none;

		transition: border-color 0.3s linear;
	}

	.field__input:hover {
		border-color: #454545;
	}

	.field__input:focus {
		border-color: #8a6f48;
	}

	.field__input--error {
		border-color: #ff0000;
	}

	.field__input::placeholder {
		font-weight: 300;
		font-size: 14px;
		line-height: 23px;
		color: #d8d8d8;
	}

	.field__error {
		position: absolute;
		top: 100%;
		font-weight: 300;
		font-size: 9px;
		line-height: 14px;

		color: #ff0000;
	}
	.field__button {
		position: absolute;
		padding: 0;
		right: 5px;
		top: 50%;
		transform: translateY(-50%);
		width: 30px;
		height: 30px;
		display: grid;
		place-items: center;
		border: none;
		background-color: transparent;
		cursor: pointer;
		--color-icon: #d8d8d8;
	}

	.field__button:hover,
	.field__button:focus {
		--color-icon: #8a6f48;
	}

	.field__button:active {
		--color-icon: #252525;
	}

	.field__button--clear {
		display: none;
	}

	.field__button--visible {
		display: block;
	}
	.field__input--with-icon {
		padding-left: 25px;
	}

	.field__icon {
		height: fit-content;
		position: absolute;
		width: 17px;
		height: 17px;
		top: 50%;
		left: 5px;
		transform: translate(0, -50%);

		--color-icon: #d8d8d8;
	}
</style>
