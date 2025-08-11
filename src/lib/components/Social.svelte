<script lang="ts">
	import type { Social } from '$lib/types/socials';

	type PlaceType = 'header' | 'footer';

	let { items, place, onClose }: { items: Social[]; place: PlaceType; onClose?: () => void } =
		$props();
</script>

<ul class="social social--{place}">
	{#each items as item (item.title)}
		<li class="social__item">
			<a
				class="social__link"
				href={item.link}
				aria-label={item.title}
				target="_blank"
				rel="noopener noreferrer"
				onclick={onClose}
			>
				<div class="social__wrapper" class:social__wrapper--first={item.title === 'Etsy'}>
					<img
						class="social__icon"
						src={`/icons/${item.icon}`}
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
		position: relative;
		width: 25px;
		height: 25px;
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
		color: var(--color--white);
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
