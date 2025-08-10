<script lang="ts">
	import MainPageForm from '$/lib/components/admin/forms/MainPageForm.svelte';

	import type { PageData } from './$types.js';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();
</script>

<MainPageForm form={data.form} />

<style>
</style>
