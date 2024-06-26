<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let label = '';
	export let value = '';
	export let error = '';
	export let name = '';
	export let placeholder = '';
	export let required = false;

	const dispatch = createEventDispatcher();

	const handleClearError = () => {
		dispatch('clearError');
	};

	const handleClear = () => {
		value = '';
		error = '';
	};
</script>

<label class="field" class:field--without-label={!label}>
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
		<textarea
			class="field__input"
			class:field__input--error={error}
			bind:value
			on:input={handleClearError}
			{name}
			{placeholder}
		/>
		{#if value}
			<button class="field__button" type="button" on:click={handleClear}
				><svg
					width="30"
					height="30"
					viewBox="0 0 30 30"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M13.4525 14.6066L8.42291 19.6362L9.97046 21.1837L15 16.1542L20.0295 21.1837L21.5771 19.6362L16.5476 14.6066L21.5771 9.57709L20.0295 8.02954L15 13.0591L9.97046 8.02954L8.42291 9.57709L13.4525 14.6066Z"
						fill="var(--color--icon)"
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
		width: 100%;
		display: grid;
		grid-template-rows: min-content 1fr;
	}

	.field--without-label {
		display: block;
	}

	.field__text {
		font-size: 15px;
		line-height: 23px;
		color: var(--color--gray-15);
	}

	.field__required {
		color: var(--color--red);
	}

	.field__wrapper {
		position: relative;
	}

	.field__input {
		width: 100%;
		height: 100%;
		min-height: 100%;
		padding: 5px 40px 5px 10px;
		background: var(--color--white);
		border: 1px solid var(--color--gray-85);
		border-radius: 4px;

		font-weight: 300;
		font-size: 14px;
		line-height: 23px;
		font: var(--font--primary);
		color: var(--color--gray-30);
		outline: none;
		resize: vertical;
		transition: border-color 0.3s linear;
	}

	.field__input:hover {
		border-color: var(--color--gray-30);
	}

	.field__input:focus-visible {
		border-color: var(--color--primary);
	}

	.field__input--error {
		border-color: var(--color--red);
	}

	.field__input::placeholder {
		font-weight: 300;
		font-size: 14px;
		line-height: 23px;
		color: var(--color--gray-85);
	}

	.field__error {
		position: absolute;
		top: 100%;
		font-weight: 300;
		font-size: 9px;
		line-height: 14px;

		color: var(--color--red);
	}
	.field__button {
		position: absolute;
		padding: 0;
		right: 5px;
		top: 18px;
		transform: translateY(-50%);
		width: 30px;
		height: 30px;
		display: grid;
		place-items: center;
		border: none;
		background-color: transparent;
		cursor: pointer;
		--color--icon: var(--color--gray-85);
	}

	.field__button:hover,
	.field__button:focus-visible {
		--color--icon: var(--color--primary);
	}

	.field__button:active {
		--color--icon: var(--color--gray-15);
	}
</style>
