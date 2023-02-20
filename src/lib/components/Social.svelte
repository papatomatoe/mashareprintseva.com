<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let items: any = [];
	export let place: 'header' | 'footer';

	const handleClose = () => {
		dispatch('close');
	};
</script>

<ul class="social social--{place}">
	{#each items as item (item.id)}
		<li class="social__item">
			<a
				class="social__link"
				href={item.link}
				aria-label={item.title}
				target="_blank"
				rel="noopener noreferrer"
				on:click={handleClose}
			>
				<div class="social__wrapper" class:social__wrapper--first={item.title === 'Etsy'}>
					<img
						class="social__icon"
						src={item.icon}
						alt={item.title}
						width={item.title === 'Etsy' ? 52 : 25}
						height="25"
					/>
				</div>
			</a>
		</li>
	{/each}
</ul>

<style>
	.social__wrapper {
		width: 25px;
		height: 25px;
		position: relative;
		overflow: hidden;
	}

	.social__wrapper--first {
		width: 52px;
	}

	.social__link {
		display: block;
	}

	.social__icon {
		opacity: 1;
		transition: opacity 0.3s linear;
	}

	.social__link:hover .social__icon {
		opacity: 0.7;
	}

	.social--header {
		display: flex;
		justify-content: space-between;
		margin: 0;
		margin-top: auto;
		margin-bottom: 30px;
		padding: 0;
	}

	.social--header .social__item:first-of-type {
		margin-left: 20px;
	}
	.social--header .social__item:last-of-type {
		margin-right: 20px;
	}

	.social--footer {
		display: flex;
		justify-content: space-between;
		margin: 0 auto;
		padding: 0;
		padding-top: 20px;
		padding-bottom: 20px;
	}

	.social--footer .social__item:first-of-type {
		margin-left: 23px;
	}

	.social--footer .social__item:last-of-type {
		margin-right: 23px;
	}

	.social--footer .social__link {
		color: #ffffff;
	}

	@media (min-width: 768px) {
		.social--header {
			display: none;
		}

		.social--footer {
			width: 350px;
		}
	}
</style>
