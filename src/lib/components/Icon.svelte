<script>
	export let width = 17;
	export let height = 17;
	export let name = '';
	export let color = 'currentColor';

	$: console.log($$props);
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	{width}
	{height}
	class="$$props.class"
	viewBox="0 0 17 17"
	aria-labelledby={name}
	role="presentation"
>
	<title id={name} lang="en">{`${name} icon`}</title>
	<g stroke={color} fill={color}>
		<slot />
	</g>
</svg>
