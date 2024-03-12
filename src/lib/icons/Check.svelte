<script lang="ts">
	export let size = 'sm';

	$: width = size === 'sm' ? 9 : 14;
</script>

<svg {width} height={width} viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M1 4.5L3.5 7L7.5 1" stroke="var(--color-icon)" stroke-width="2" stroke-linecap="round" />
</svg>
